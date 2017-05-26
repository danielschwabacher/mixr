import '../../imports/ui/helpers/manageEventsHelpers.js';
import '../../imports/ui/helpers/accountSettingsHelpers2.js';

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
		this.render('accountSettings')
	}
	else {
		// console.log("DEVNOTE: FIX THIS -- YOU ARE NOT LOGGED ON")
		Router.go('home')
	}
});
