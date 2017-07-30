import './routes/defaultRoutes.js'
import './routes/eventRoutes.js'
import './routes/settingsAndManageRoutes.js'
import './routes/accountControlRoutes.js'

Modal.allowMultiple = true
if (Meteor.isClient) {
	fullTagArray = ['sports', 'performances', 'arts', 'academicInterest', 'other']
	Session.set('tagFilterIncludes', fullTagArray)
	Session.set('timeFilterHours', 72)
	// console.log("current userId: " + Meteor.userId())
	key = Meteor.settings.public.google_key;
	Meteor.startup(function() {
		GoogleMaps.load({
			key: key
		});
		Session.set('hasCachedEvent', false)
	});
}
