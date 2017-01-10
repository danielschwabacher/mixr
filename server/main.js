import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.publish('events', function(){
		console.log("got another subscriber.")
	});
});
