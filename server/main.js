import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
	//process.env.MAIL_URL = 'smtp://mixrdev123456%40gmail.com:' + encodeURIComponent("Zope123456^") + '@smtp.gmail.com:465';
	process.env.MAIL_URL = 'smtp://postmaster%40sandbox0edf40d3935f41999685a212a4572488.mailgun.org:Zope123456^@smtp.mailgun.org:587';

	Meteor.publish('events', function(){
		return EventCollection.find({}, {fields: {'created_by': 0, 'users_attending': 0}});
	});
	Meteor.publish('userEventsCrossReference', function(){
		return UserEventsCrossReferenceCollection.find({})
	});
	//insertFakeData()
});


insertFakeData = function(){
	for (i = 0; i < 500; i++){
		console.log("creating random event, number: " + i)
		latDet = 40.008952566368045 + (Math.random() / i + ((Math.random() *(i/1000))));
		longDet = -105 + (Math.random() / i) - (Math.random() *(i/1000));
		console.log("latDet: " + latDet)
		console.log("longDet: " + longDet)
		EventCollection.insert({
			// "expireAt": new Date(),
			created_by: i+23847234/70*32 << 100,
			event_name: "name",
			event_location: "location",
			event_description: "description",
			event_dateTime: new Date(),
			event_timestamp: Math.floor(Date.now() / 1000),
			event_tag: "sports",
			event_position: { "latitude" : latDet, "longitude" : longDet },
			number_of_users_attending: 1
		});
	}
}
