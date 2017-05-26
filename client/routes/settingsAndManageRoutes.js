import '../../imports/ui/helpers/accountSettingsHelpers.js';
import '../../imports/ui/helpers/manageEventsHelpers.js';
import '../../imports/ui/helpers/newAccountSettingsPage.js';


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

/*
Router.route('/newAccount', function(){
	if (Meteor.user()){
		this.render('newSettings')
	}
	else {
		// console.log("DEVNOTE: FIX THIS -- YOU ARE NOT LOGGED ON")
		Router.go('home')
	}
});
*/
