/*
	DaemonTester objects implement some handy functions for testing UserEventsCrossReferenceCollection purges.

*/
DaemonTester = function(){
	this.done = false
}

/*
	HELPERS TO BE USED IN GENERATION FUNCTIONS
	generateRandomUserId -- returns a random userId string
	generateRandomEventId -- returns a random number to be used as an eventId
*/
DaemonTester.prototype.generateRandomUserId = function(){
	return Math.random().toString(36).substring(7);
}

DaemonTester.prototype.generateRandomEventId = function(){
	return Math.random().toString(36).substring(7);
}
/*
	END HELPERS
*/


DaemonTester.prototype.isDone = function(){
	return this.done
}

/*
	Adds 'fake' events to the userEvents table.
	Each loop generates a random owner and random eventId to be placed in the owned_events subdocument.
	Parameters: numEvents -- the number of events to add
*/
DaemonTester.prototype.addOwnedEventsAcrossMultipleUsers = function(numEvents){
	for (i = 0; i < numEvents; i++){
		randomUserId = this.generateRandomUserId()
		randomId = this.generateRandomEventId()
		UserEventsCrossReferenceCollection.update(
			{user: randomUserId},
			{$push: {
				owned_events:
				{
					eventId: randomId,
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
	console.log("Added random owned events to multiple users.")
	return 1
}


/*
	Adds 'fake' events to the userEvents table.
	Each loop generates a random owner and random eventId to be placed in the registered_events subdocument.
	Parameters: numEvents -- the number of events to add
*/
DaemonTester.prototype.addRegisteredEventsAcrossMultipleUsers = function(numEvents){
	for (i = 0; i < numEvents; i++){
		randomUserId = this.generateRandomUserId()
		randomId = this.generateRandomEventId()
		UserEventsCrossReferenceCollection.update(
			{user: randomUserId},
			{$push: {
				registered_events:
				{
					eventId: randomId,
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
	console.log("Added random registered events to multiple users.")
	return 1
}

/*
	Adds 'fake' events to the userEvents table.
	Each loop generates a random owner and 2 random eventIds to be placed
	in both the owned_events and the registered_events subdocuments, respectively.
	Parameters: numEvents -- the number of events to add
*/
DaemonTester.prototype.addBothEventTypesAcrossMultipleUsers = function(numEvents){
	for (i = 0; i < numEvents; i++){
		randomUserId = this.generateRandomUserId()
		randomOwnedId = this.generateRandomEventId()
		randomRegisteredId = this.generateRandomEventId()
		UserEventsCrossReferenceCollection.update(
			{user: randomUserId},
			{$push: {
				owned_events:
				{
					eventId: randomOwnedId,
				},
				registered_events:
				{
					eventId: randomRegisteredId,
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
	console.log("Added random owned and registered types to multiple users.")
	return 1
}

/*
	Adds 'fake' events to the userEvents table.
	The one creates a singular userId provided by name and populates its
	userEvent subdocuments with randomIds.
	Parameters:
	numEvents -- the number of events to add
	name -- the name used to populate the userEvents table with eventIds
*/
DaemonTester.prototype.addMultipleEventsToASingleUser = function(numEvents, name){
	for (i = 0; i < numEvents; i++){
		randomOwnedId = this.generateRandomEventId()
		randomRegisteredId = this.generateRandomEventId()
		UserEventsCrossReferenceCollection.update(
			{user: name},
			{$push: {
				owned_events:
				{
					eventId: randomOwnedId,
				},
				registered_events:
				{
					eventId: randomRegisteredId,
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
	console.log("Added random owned and registered event types to user: " + name);
	return 1
}

/*
	Simple wrapper to run all 4 types of population use cases.
	Parameters:
	numEvents -- the number of events to add
	name -- the name used to populate the userEvents table with eventIds
*/
DaemonTester.prototype.populate = function(numEvents, name){
	if (this.addOwnedEventsAcrossMultipleUsers(numEvents) && this.addRegisteredEventsAcrossMultipleUsers(numEvents) &&
	this.addBothEventTypesAcrossMultipleUsers(numEvents) && this.addMultipleEventsToASingleUser(numEvents, name)){
		this.done = true
		console.log("Populate finished successfully!")
		return 1;
	}
}
