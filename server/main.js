import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.publish('events', function(){
		return EventCollection.find({}, {fields: {'created_by': 0, 'users_attending': 0}});
	});
	Meteor.publish('ownedEvents', function(){
		console.log('subscribed to ownedEvents')
		return UserEventsCrossReferenceCollection.find({})
	});
});
