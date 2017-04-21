import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './crossReferenceTableDaemon.js'
import './daemonTester.js'
import './databaseTesting.js'
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
	Meteor.setInterval(function(){
		CrossReferenceSpider.purge()
	}, 86400000);
	insertFakeData()
});
