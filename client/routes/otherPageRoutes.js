// import '../../imports/ui/helpers/settingsHelpers.js';
import '../../imports/ui/helpers/manageEventsHelpers.js';

Router.route('/manage', function(){
	if (Meteor.user()){
		this.render('manageEventsPanel')
	}
	else {
		// console.log("DEVNOTE: FIX THIS -- YOU ARE NOT LOGGED ON")
		Router.go('home')
	}
});
