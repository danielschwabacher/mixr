/*
	Because the crossReference table is an amalgamation of subdocuments, it is not able to
	utilize mongo's TTL system. The CrossReferenceDaemon will search for eventIDs not longer present
	in the big event table and expire the assocaited eventIds from the crossReference table.

	sleepTime: the amount of time (in milliseconds) between table purges.
*/
CrossReferenceDaemon = function(){}

// get all the owned_event ids across every user in the crossReference table
CrossReferenceDaemon.prototype.getOwnedEventIds = function(){
	var allOwnedEventIds = []
	var ownedEvents = UserEventsCrossReferenceCollection.find( {}, {'owned_events.eventId': 1} )
	ownedEvents.forEach(function(doc){
		if (doc.owned_events){
			// console.log(doc.owned_events.length)
			for (i = 0; i < doc.owned_events.length; i++){
				allOwnedEventIds.push(doc.owned_events[i].eventId)
			}
		}
	});
	return allOwnedEventIds
}


CrossReferenceDaemon.prototype.getRegisteredEventIds = function(){
	var allRegsiteredEventIds = []
	var registeredEventsCursor = UserEventsCrossReferenceCollection.find( {}, {'registered_events.eventId': 1} )
	registeredEventsCursor.forEach(function(doc){
		if (doc.registered_events){
			for (i = 0; i < doc.registered_events.length; i++){
				allRegsiteredEventIds.push(doc.registered_events[i].eventId)
			}
		}
	});
	return allRegsiteredEventIds
}

// remove eventIds that are no longer in the owned_events subdocument
CrossReferenceDaemon.prototype.expireOwnedEventIds = function(eventIds){
	for (i = 0; i < eventIds.length; i++){
		currentEventId = eventIds[i]
		// console.log("on eventId: " + eventIds[i])
		var result = EventCollection.findOne(
			{_id: currentEventId}
		)
		if (!result){
			// console.log("Owned event id: " + currentEventId + " not found in DB.")
			UserEventsCrossReferenceCollection.update(
				{},
				{$pull: {
					owned_events:
					{
						eventId: currentEventId,
					}
				}},
				{multi: true},
			)
		}
	}
}

// remove eventIds that are no longer in the regsitered_events subdocument
CrossReferenceDaemon.prototype.expireRegisteredEventIds = function(eventIds){
	for (i = 0; i < eventIds.length; i++){
		currentEventId = eventIds[i]
		// console.log("on eventId: " + eventIds[i])
		var result = EventCollection.findOne(
			{_id: currentEventId}
		)
		if (!result){
			// console.log("Registered event id: " + currentEventId + " not found in DB.")
			UserEventsCrossReferenceCollection.update(
				{},
				{$pull: {
					registered_events:
					{
						eventId: currentEventId,
					}
				}},
				{multi: true},
			)
		}
	}
}


CrossReferenceDaemon.prototype.waitAndExpireEvents = function(idList, callback){
	callback(idList)
}
