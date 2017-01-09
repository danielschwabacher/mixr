import '../../imports/ui/helpers/settingsHelpers.js';

Router.route('/settings', function(){
	if (Meteor.user()){
		this.render('settingsPage')
	}
	else {
		console.log("you are not logged in")
		Router.go('home')
	}
});
