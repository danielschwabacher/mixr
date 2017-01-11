// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
Meteor.methods({
	"insertEvent": function(eventToInsert){
		EventCollection.insert({
			created_by: Meteor.userId(),
			event_name: eventToInsert.eventName,
			event_location: eventToInsert.eventLoc,
			event_description: eventToInsert.eventDescription,
			event_dateTime: eventToInsert.eventDateTime,
			event_position: eventToInsert.coordinates,
			number_of_users_attending: 1,
			usersIds_attending: [Meteor.userId()]
		}, function(err, eventId){
			if (err){
				console.log("error inserting event.")
			}
		});
	},
	"updateAttendances": function(eventToUpdate, idToAdd){
		console.log("updating the event collection for event: " + eventToUpdate.event_name)
		//TODO: check if user already registered for event
		EventCollection.update(
			{_id: eventToUpdate._id},
			{
				$inc: {number_of_users_attending: 1},
				$push: {usersIds_attending: idToAdd}
			}
		);
	}
});
