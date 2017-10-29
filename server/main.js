import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './crossReferenceTableDaemon.js'
import './daemonTester.js'
import './databaseTesting.js'
Meteor.startup(() => {
	Accounts.urls.verifyEmail = function(token){
		return Meteor.absoluteUrl("verify/" + token);
	  };
	smtp_creds = {
		username: 'admin@emails.mixrbeta.com',   // eg: server@gentlenode.com
		password: 'Zope123456',   // eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.mailgun.org',  // eg: mail.gandi.net
		port: 587
	  }
	
	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp_creds.username) + ':' + encodeURIComponent(smtp_creds.password) + '@' + encodeURIComponent(smtp_creds.server) + ':' + smtp_creds.port;
	
	console.log(process.env.MAIL_URL)

	Meteor.publish('events', function(){
		return EventCollection.find({}, {fields: {'created_by': 0, 'users_attending': 0}});
	});

	Meteor.publish('userEventsCrossReference', function(){
		return UserEventsCrossReferenceCollection.find({})
	});

	CrossReferenceSpider = new CrossReferenceDaemon()

	Meteor.setInterval(function(){
		CrossReferenceSpider.purge()
	}, 1800000);

});