import '../../imports/ui/helpers/navbarHelpers.js';
import '../../imports/ui/helpers/signupHelpers.js';
import '../../imports/ui/helpers/loginHelpers.js';

// if user is not already logged in, go to the signup page
Router.route('/signup', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				this.render('signupPage');
			}
		}
		else{
			Router.go('home')
		}
	}
});

// if user is not already logged in, go to the login page
Router.route('/login', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				this.render('loginPage');
			}
		}
		else{
			Router.go('home')
		}
	}
});

Router.route('/logout', {
	onBeforeAction: function(){
		if (Meteor.user()){
			Meteor.logout(function(err){
				if (err){
					console.log("could not sign out user, error: " + err)
				}
			});
		}
	},
	onAfterAction: function(){
		Router.go('home')
	}
});
