// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
//userEvents collection
Meteor.methods({
	insertEvent: function(eventToInsert, expiration){
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
					{upsert: true}, function(err, eventId){
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
		// if the user has not already registered
		// is true if user owns event
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
		if (!isOwner && !isRegistered){
			// Increment the number of users attending the associatve event
			EventCollection.update(
				{_id: eventToUpdate._id},
				{
					$inc: {number_of_users_attending: 1},
				},
				function(err, eventId){
					if (err){
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
						return 0;
					}
				}
			)
			// call method to send email to user with the details of event
			Meteor.call('sendRegisteredForEventEmail', eventToUpdate)

			return 1;
		}

		else{
			return 0
		}
	},
	// unregistering an event
	// decrease the number attending by 1 in bigEvents table
	// remove reference to event in user's crossReference table
	unregisterEvent: function(eventId){
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
	// remove event from big events collection
	// remove EVERY reference to event in every users collection
	deleteEvent: function(eventId){
		// Call method to tell all registered users the event has been deleted
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
