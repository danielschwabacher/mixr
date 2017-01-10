// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
Meteor.methods({
	"insertEvent": function(eventToInsert){
		EventCollection.insert({
			event_name: eventToInsert.eventName,
			event_location: eventToInsert.eventLoc,
			event_description: eventToInsert.eventDescription,
			event_dateTime: eventToInsert.eventDateTime,
			event_position: eventToInsert.coordinates
		}, function(err, eventId){
			if (err){
				console.log("error inserting event.")
			}
		});
	}
});
