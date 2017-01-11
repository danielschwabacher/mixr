import './routes/defaultRoutes.js'
import './routes/eventRoutes.js'
import './routes/userControlRoutes.js'
Modal.allowMultiple = true
if (Meteor.isClient) {
	console.log("current userId: " + Meteor.userId())
	Meteor.startup(function() {
		GoogleMaps.load({
			key: 'AIzaSyAox36VrlsVU2wRfAJ8R94ysdsFts9o1EU'
		});
		Session.set('hasCachedEvent', false)
	});
}
