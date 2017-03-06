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
	addData()
	console.log("---DATA ADDED---")
	CrossReferenceSpider = new CrossReferenceDaemon()
	if (!CrossReferenceSpider.expireOwned){
		console.log("purging owned...")
		ownedIds = CrossReferenceSpider.getOwnedEventIds()
		CrossReferenceSpider.expireOwnedEventIds(ownedIds)
		console.log("purge done")
	}
	if (!CrossReferenceSpider.expireReg){
		console.log("purging registered...")
		registeredIds = CrossReferenceSpider.getRegisteredEventIds()
		CrossReferenceSpider.expireRegisteredEventIds(registeredIds)
		console.log("purge done")
	}
});








addData = function(){
	for (i = 0; i < 5; i++){
		randomId = (Math.random() / i + ((Math.random() *(i/1000))));
		UserEventsCrossReferenceCollection.update(
			{user: "testingPurge"},
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
	console.log("added section 0")
	for (i = 0; i < 5; i++){
		randomId = (Math.random() / i + ((Math.random() *(i/1000))));
		randomId2 = "89584397d" + (Math.random() / i + ((Math.random() *(i/1000))));
		UserEventsCrossReferenceCollection.update(
			{user: randomId},
			{$push: {
				owned_events:
				{
					eventId: randomId + "7326dsf" + randomId2,
				},
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
	console.log("added section 1")
}
