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
		for (i = 0; i < doc.owned_events.length; i++){
			allOwnedEventIds.push(doc.owned_events[i].eventId)
		}
	});
	return allOwnedEventIds
}

// remove eventIds that are no longer in the ownedEvents subdocument
CrossReferenceDaemon.prototype.expireOwnedEventIds = function(eventIds){
	for (i = 0; i < eventIds.length; i++){
		currentEventId = eventIds[i]
		// console.log("on eventId: " + eventIds[i])
		var result = EventCollection.findOne(
			{_id: currentEventId}
		)
		if (!result){
			// console.log("updating: " + currentEventId)
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
