import '../../imports/ui/helpers/settingsHelpers.js';

Router.route('/settings', function(){
	if (Meteor.user()){
		this.render('settingsPage')
	}
	else {
		// console.log("DEVNOTE: FIX THIS -- YOU ARE NOT LOGGED ON")
		Router.go('home')
	}
});
