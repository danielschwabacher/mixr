import './routes/defaultRoutes.js'
import './routes/eventRoutes.js'
import './routes/userControlRoutes.js'

if (Meteor.isClient) {
	Meteor.startup(function() {
		GoogleMaps.load({
			key: 'AIzaSyAox36VrlsVU2wRfAJ8R94ysdsFts9o1EU' 
		});
	});
}
