// This file contains intermediate methods between in client memory
// Event objects and the Events database collection.
// NOTE: These are client side methods, DO NOT VALIDATE EVENT DB SCHEMA HERE
// NOTE: SUBSCRIBE HERE

EventWrapper = function(eventToWrap) {
	console.log(JSON.stringify(eventToWrap))
	this.eventName = eventToWrap.eventName
	this.eventLoc = eventToWrap.eventLoc
	this.eventDescription = eventToWrap.eventDescription
	this.eventDateTime = eventToWrap.eventDateTime
	this.coordinates = eventToWrap.coordinates
}

EventWrapper.prototype.insertEvent = function(){
	EventCollection.insert({
		event_name: this.eventName,
		event_location: this.eventLoc,
		event_description: this.eventDescription,
		event_dateTime: this.eventDateTime,
		event_position: this.coordinates
	}, function(err, eventId){
		if (err){
			console.log("error inserting event.")
		}
	});
};
