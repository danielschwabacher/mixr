import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './crossReferenceTableDaemon.js'
import './daemonTester.js'
import './databaseTesting.js'
Meteor.startup(() => {
	//UserEventsCrossReferenceCollection.remove({})
	process.env.MAIL_URL = 'smtp://postmaster%40emails.mixrbeta.com:9f5c1992954e0cbba1cadba72784975d@smtp.mailgun.org:587';

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
	// insertFakeData()
});
