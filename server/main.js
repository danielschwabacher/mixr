import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.publish('events', function(){
		console.log("got another subscriber.")
		return EventCollection.find({}, {fields: {"_id": 0, 'event_dateTime':0}});
	});
});
