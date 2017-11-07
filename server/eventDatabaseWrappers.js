// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
//userEvents collection
Meteor.methods({
	insertEvent: function(eventToInsert, expiration){
		console.log("Inserting event...");
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
							return 0;
						}
					}
				)
			}
		});
		return 1;
	},
	registerEvent: function(eventToUpdate){
		// REGISTER CONDITIONS:
		// User must not own event and must not already be registered
		// Event must be able to accomodate another person attending.
		// eg. (current_attending < max_attending)
		console.log("Registering for event...");
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
		console.log("gettign event id");
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
			return -1
		}
		console.log("GOt event id. Checking bools.");		
		if (!isOwner && !isRegistered && eventCanBeRegisteredFor){
			// Increment the number of users attending the associative event
			EventCollection.update(
				{_id: eventToUpdate._id},
				{
					$inc: {number_of_users_attending: 1},
				},
				function(err, eventId){
					if (err){
						console.log("Error registering for event within EventCollection.update")
						console.log(err)
						return 0;
					}
				}
			);
			console.log("After first eventcoll call.");		
			
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
						console.log("Error registering for event within UserEventsCrossReferenceCollection.update")
						console.log(err)
						return 0;
					}
				}
			)
			console.log("Updating cross reference table.");					
			// call method to send email to user with the details of event
			// IMPORTANT: this causes unexpected notify behavior (Error: you are already registered) when emailing accounts which aren't sandbox verified.
			console.log("about to send email");		
			Meteor.call('sendRegisteredForEventEmail', eventToUpdate, function(err){
				if (err){
					return -2
				}
				else{
					console.log("no err in send")
				}
			});
			console.log("Registered for event success!")
			return 1;
		}

		else{
			console.log("Error registering for event -- user or event does not meet registration critiera.")
			return 0
		}
	},
	// unregistering an event
	// decrease the number attending by 1 in the big Events table
	// remove reference to event in user's crossReference table
	unregisterEvent: function(eventId){
		console.log("Unregistering for event...");
		EventCollection.update(
			{_id: eventId},
			{
				$inc: {number_of_users_attending: -1},
			},
			function(err, eventId){
				if (err){
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
					return 0;
				}
			}
		)
		return 1
	},
	// deleting an event
	// remove event from big Events collection
	// remove EVERY reference to event in every users collection
	deleteEvent: function(eventId){
		// Call method to tell all registered users the event has been deleted
		console.log("Deleting event...");
		Meteor.call('sendEventDeletedEmail', eventId, function(err) {
			if (err){
				console.log('Email was NOT sent successfully' + err)
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
					return 0;
				}
			}
		)
		return 1
	}
});
