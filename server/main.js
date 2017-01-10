import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.publish('events', function(){
		console.log("got another subscriber.")
		return EventCollection.find({}, {fields: {'created_by': 0, 'users_attending': 0}});
	});
});
