import '../../imports/ui/helpers/accountSettingsHelpers.js';
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


Router.route('/account', function(){
	if (Meteor.user()){
		this.render('accountSettingsPage')
	}
	else {
		// console.log("DEVNOTE: FIX THIS -- YOU ARE NOT LOGGED ON")
		Router.go('home')
	}
});
