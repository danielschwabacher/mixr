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
	Meteor.startup(function() {
		GoogleMaps.load({
			key: 'AIzaSyAox36VrlsVU2wRfAJ8R94ysdsFts9o1EU'
		});
		Session.set('hasCachedEvent', false)
	});
}
