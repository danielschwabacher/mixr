// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
//userEvents collection
Meteor.methods({
	"insertEvent": function(eventToInsert){
		EventCollection.insert({
			created_by: Meteor.userId(),
			event_name: eventToInsert.eventName,
			event_location: eventToInsert.eventLoc,
			event_description: eventToInsert.eventDescription,
			event_dateTime: eventToInsert.eventDateTime,
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
	"registerEvent": function(eventToUpdate){
		// if the user has not already registered
		var isRegistered = UserEventsCrossReferenceCollection.findOne(
			{
				user: Meteor.userId(),
				'events.eventId': eventToUpdate._id
			}
		)
		if (!isRegistered){
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
			return 1;
		}
		else{
			return 0
		}
	}
});
