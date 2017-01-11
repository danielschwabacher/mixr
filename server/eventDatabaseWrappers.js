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
					{$push: {events:
						{
							eventId: eventId,
							owned: true
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
			console.log("not registered.")
			// Increment the number of users attending the associatve event
			// TODO: Check for error in callback
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
			// add the eventId to the user's table
			// owned: false
			UserEventsCrossReferenceCollection.update(
				{user: Meteor.userId()},
				{$push: {events:
					{
						eventId: eventToUpdate._id,
						owned: false
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
