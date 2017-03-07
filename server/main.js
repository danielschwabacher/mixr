import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './crossReferenceTableDaemon.js'
Meteor.startup(() => {
	//UserEventsCrossReferenceCollection.remove({})
	//process.env.MAIL_URL = 'smtp://mixrdev123456%40gmail.com:' + encodeURIComponent("Zope123456^") + '@smtp.gmail.com:465';
	process.env.MAIL_URL = 'smtp://postmaster%40sandbox0edf40d3935f41999685a212a4572488.mailgun.org:Zope123456^@smtp.mailgun.org:587';

	Meteor.publish('events', function(){
		return EventCollection.find({}, {fields: {'created_by': 0, 'users_attending': 0}});
	});
	Meteor.publish('userEventsCrossReference', function(){
		return UserEventsCrossReferenceCollection.find({})
	});
	CrossReferenceSpider = new CrossReferenceDaemon()
	addOwnedEventsAcrossMultipleUsers(750)
	addRegisteredEventsAcrossMultipleUsers(750)
	addBothEventTypesAcrossMultipleUsers(750)
	addMultipleEventsToASingleUser(100, "bob")
	Meteor.setTimeout(function(){
		console.log("Timeout Expired.")
		console.log("Purging Owned...")
		console.time('ownedPurge');
		ownedIds = CrossReferenceSpider.getOwnedEventIds()
		CrossReferenceSpider.waitAndExpireEvents(ownedIds, CrossReferenceSpider.expireOwnedEventIds),
		console.timeEnd('ownedPurge');
		console.log("Purge Done")
		console.log("-------------")
		console.time('regPurge');
		console.log("Purging Registered...")
		ownedIds = CrossReferenceSpider.getRegisteredEventIds()
		CrossReferenceSpider.waitAndExpireEvents(ownedIds, CrossReferenceSpider.expireRegisteredEventIds),
		console.timeEnd('regPurge');
		console.log("Purge Done")
		console.log("---ALL PURGING DONE---")
	}, 10000);
});








addOwnedEventsAcrossMultipleUsers = function(numEvents){
	for (i = 0; i < numEvents; i++){
		randomUserId = Math.random().toString(36).substring(7);
		randomId = (Math.random() / i + ((Math.random() *(i/1000))));
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
	console.log("Added random owned events.")
}



addRegisteredEventsAcrossMultipleUsers = function(numEvents){
	for (i = 0; i < numEvents; i++){
		randomUserId = Math.random().toString(36).substring(7);
		randomId2 = "89584397d" + (Math.random() / i + ((Math.random() *(i/1000))));
		UserEventsCrossReferenceCollection.update(
			{user: randomUserId},
			{$push: {
				registered_events:
				{
					eventId: randomId2,
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
	console.log("Added random registered events.")
}

addBothEventTypesAcrossMultipleUsers = function(numEvents){
	for (i = 0; i < numEvents; i++){
		randomUserId = Math.random().toString(36).substring(7);
		randomOwnedId = Math.random().toString(36).substring(7);
		randomId2 = Math.random().toString(36).substring(7);
		UserEventsCrossReferenceCollection.update(
			{user: randomUserId},
			{$push: {
				owned_events:
				{
					eventId: randomOwnedId,
				},
				registered_events:
				{
					eventId: randomId2,
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
	console.log("Added random double event types.")
}

addMultipleEventsToASingleUser = function(numEvents, name){
	for (i = 0; i < numEvents; i++){
		randomOwnedId = Math.random().toString(36).substring(7);
		randomId2 = Math.random().toString(36).substring(7);
		UserEventsCrossReferenceCollection.update(
			{user: name},
			{$push: {
				owned_events:
				{
					eventId: randomOwnedId,
				},
				registered_events:
				{
					eventId: randomId2,
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
	console.log("Added random double event types to user: " + name);
}
