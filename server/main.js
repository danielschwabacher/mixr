import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './crossReferenceTableDaemon.js'
Meteor.startup(() => {
	//process.env.MAIL_URL = 'smtp://mixrdev123456%40gmail.com:' + encodeURIComponent("Zope123456^") + '@smtp.gmail.com:465';
	process.env.MAIL_URL = 'smtp://postmaster%40sandbox0edf40d3935f41999685a212a4572488.mailgun.org:Zope123456^@smtp.mailgun.org:587';

	Meteor.publish('events', function(){
		return EventCollection.find({}, {fields: {'created_by': 0, 'users_attending': 0}});
	});
	Meteor.publish('userEventsCrossReference', function(){
		return UserEventsCrossReferenceCollection.find({})
	});
	CrossReferenceSpider = new CrossReferenceDaemon()
	// run purge once per day (every 86400000 seconds) 
	Meteor.setInterval(purge, 86400000)
});

purge = function(){
	// console.log("purging...")
	idList = CrossReferenceSpider.getOwnedEventIds()
	CrossReferenceSpider.expireOwnedEventIds(idList)
}
