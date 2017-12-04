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
	// key = Meteor.settings.public.google_key;
	Meteor.startup(function() {
		GoogleMaps.load({
			key: "AIzaSyDo5FICKH4_eCZCYbcpaaGpaNsom7NaY-8"
			
		});
		Session.set('hasCachedEvent', false)
	});

	Meteor.Spinner.options = {
		  lines: 17,  // The number of lines to draw
		  length: 25,  // The length of each line
		  width: 8,  // The line thickness
		  radius: 32,  // The radius of the inner circle
		  corners: 1,  // Corner roundness (0..1)
		  rotate: 0,  // The rotation offset
		  direction: 1,  // 1: clockwise, -1: counterclockwise
		  color: '#fff',  // #rgb or #rrggbb
		  speed: 1.3,  // Rounds per second
		  trail: 70,  // Afterglow percentage
		  shadow: false,  // Whether to render a shadow
		  hwaccel: false,  // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9,  // The z-index (defaults to 2000000000)
		  top: '50%',  // Top position relative to parent in px
		  left: '50%'  // Left position relative to parent in px
		}

}
