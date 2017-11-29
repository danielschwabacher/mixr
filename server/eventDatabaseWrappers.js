// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
//userEvents collection
import "./lumberjack.js"
import "./loggers.js"
Meteor.methods({
	insertEvent: function(eventToInsert, expiration){
		server_logger.info("Inserting event: " + eventToInsert.eventName)
		expirationTime = moment((expiration*1000)).toDate()
		EventCollection.insert({
			"expireAt": new Date(expirationTime),
			created_by: Meteor.userId(),
			event_name: eventToInsert.eventName,
			event_location: eventToInsert.eventLoc,
			event_description: eventToInsert.eventDescription,
			event_dateTime: eventToInsert.eventDateTime,
			event_timestamp: eventToInsert.eventTimeStamp,
			event_tag: eventToInsert.eventTagType,
			event_max_number: eventToInsert.eventMaxRegistered,
			event_position: eventToInsert.coordinates,
			number_of_users_attending: 1
		}, function(err, eventId){
			if (err){
				server_logger.error("Error updating EventCollection")
				return 0;
			}
			else{
				// Update the cross reference table if inserted
				// Creator owns event
				UserEventsCrossReferenceCollection.update(
					{user: Meteor.userId()},
					{$push: {
						owned_events:
						{
							eventId: eventId,
						}
					}},
					{upsert: true},
					function(err, eventId){
						if (err){
							server_logger.error("Error updating CrossReferenceTable")
							return 0;
						}
					}
				)
			}
		});	
		Meteor.call('sendCreatedEventEmail', eventToInsert.eventName, function(err, result){
			if (err){
				server_logger.error("Error within sendCreatedEventEmail: " + err)				
				return -2
			}
			else{
				server_logger.info("Sent created event email!")
			}
		});								
		return 1;
	},
	registerEvent: function(eventToUpdate){
		// REGISTER CONDITIONS:
		// User must not own event and must not already be registered
		// Event must be able to accomodate another person attending.
		// eg. (current_attending < max_attending)
		server_logger.info("Registering user: " + Meteor.userId() + " for event: " + eventToUpdate._id)			
		event_dateTime = eventToUpdate.eventDateTime
		var isOwner = UserEventsCrossReferenceCollection.findOne(
			{
				user: Meteor.userId(),
				'owned_events.eventId': eventToUpdate._id
			}
		)
		// is true if owner is already registered to event
		var isRegistered = UserEventsCrossReferenceCollection.findOne(
			{
				user: Meteor.userId(),
				'registered_events.eventId': eventToUpdate._id
			}
		)
		// This is the event with the corresponding ID.
		// Used to get max and current registrations.
		var eventContext = EventCollection.findOne(
			{'_id': eventToUpdate._id}
		)
		var eventCurrentRegistered = eventContext.number_of_users_attending
		var eventMaxNumber = eventContext.event_max_number
		var eventCanBeRegisteredFor = null
		if (eventCurrentRegistered < eventMaxNumber){
			eventCanBeRegisteredFor = true
		}
		else {
			eventCanBeRegisteredFor = false
		}
		if (!eventCanBeRegisteredFor){
			server_logger.info("User is not eligble to register to event")
			return -1
		}
		if (!isOwner && !isRegistered && eventCanBeRegisteredFor){
			// Increment the number of users attending the associative event
			EventCollection.update(
				{_id: eventToUpdate._id},
				{
					$inc: {number_of_users_attending: 1},
				},
				function(err, eventId){
					if (err){
						server_logger.error("Error registering within EventCollection.update: " + err)
						return 0;
					}
				}
			);
			// add the eventId to the user's registered section
			UserEventsCrossReferenceCollection.update(
				{user: Meteor.userId()},
				{$addToSet: {
					registered_events:
					{
						eventId: eventToUpdate._id,
					}
				}},
				{upsert: true},
				function(err, eventId){
					if (err){
						server_logger.error("Error registering within UserEventsCrossReferenceCollection.update: " + err)
						console.log(err)
						return 0;
					}
				}
			)			
			// call method to send email to user with the details of event
			// IMPORTANT: this causes unexpected notify behavior (Error: you are already registered) when emailing accounts which aren't sandbox verified.
			Meteor.call('sendRegisteredForEventEmail', eventToUpdate, function(err, result){
				if (err){
					server_logger.error("Error within sendRegisteredForEventEmail: " + err)				
					return -2
				}
				else{
					server_logger.info("Sent event registered email!")					
				}
			});
			return 1;
		}

		else{
			server_logger.error("Registration error -- user or event does not meet registration critiera.")				
			return 0
		}
	},
	// unregistering an event
	// decrease the number attending by 1 in the big Events table
	// remove reference to event in user's crossReference table
	unregisterEvent: function(eventId){
		server_logger.info("Unregistering user: " + Meteor.userId() + " from event: " + eventId)			
		EventCollection.update(
			{_id: eventId},
			{
				$inc: {number_of_users_attending: -1},
			},
			function(err, eventId){
				if (err){
					server_logger.error("Unregister error within EventCollection: " + err)
					return 0;
				}
			}
		)
		UserEventsCrossReferenceCollection.update(
			{user: Meteor.userId()},
			{$pull: {
				registered_events:
				{
					eventId: eventId,
				}
			}},
			function(err, eventId){
				if (err){
					server_logger.error("Unregister error within CrossReferenceTable: " + err)
					return 0;
				}
			}
		)
		server_logger.info("Unregistration success!")			
		return 1
	},
	// deleting an event
	// remove event from big Events collection
	// remove EVERY reference to event in every users collection
	deleteEvent: function(eventId, memo){
		// Call method to tell all registered users the event has been deleted
		server_logger.info("Deleting event: " + eventId)		
		var delEvent = EventCollection.findOne(
			{
			  _id: eventId
			}
		)
		var eName = delEvent.event_name
		var eLocation = delEvent.event_location
		var eDate = delEvent.event_dateTime
		var numRegistered = delEvent.number_of_users_attending

		// Find the registered users, so we can send each of them an email
		var registeredUsers = UserEventsCrossReferenceCollection.find(
			{
			  'registered_events.eventId': eventId
			}
		);

		registeredUsers.forEach(function(doc) {
				let currUserID = doc.user
				let currUser = Meteor.users.findOne(
					{
					_id: currUserID
					}
				)
				let currEmail = currUser.emails[0].address
				var emailPreference = currUser.profile.custom_email_preferences.event_deleted
			
				if (emailPreference) {
					var link = Meteor.absoluteUrl() + "account"					
					var emailText = "The event " + eName + " scheduled for " + eDate + " at " + eLocation + " has been deleted. At the time of deletion, there were " + numRegistered + " people who RSVPed.\n\n\nAt mixr, we are actively working on better ways to handle deleted events, for now, however, we apologize for any inconvenience this may cause."
					var memoText = "The event owner gave the following reason for deleting this event:\n" + memo
					var emailData = {
						message: emailText,
						memo: memoText,
 						unsubscribeLink: link
					}
					Meteor.call('sendEventDeletedEmail', currEmail, emailData, function(err) {
						if (err){
							server_logger.error("Error within sendEventDeletedEmail: " + err)	
						}
					});
				}
		});
		EventCollection.remove(
			{_id: eventId},
		)
		UserEventsCrossReferenceCollection.update(
			{},
			{$pull: {
				registered_events:
				{
					eventId: eventId,
				},
				owned_events:
				{
					eventId: eventId,
				}
			}},
			{multi: true},
			function(err, eventId){
				if (err){
					server_logger.error("Error deleting event: " + err)	
					return 0;
				}
			}
		)
		server_logger.info("Delete event success!")					
		return 1
	}
});
