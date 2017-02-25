import '../../imports/ui/helpers/navbarHelpers.js';
import '../../imports/ui/helpers/signupHelpers.js';
import '../../imports/ui/helpers/loginHelpers.js';
import './eventRoutes.js'

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
//TODO: fix route dispatch not rendered.
Router.route('/login', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				this.render('loginPage');
			}
		}
		else{
			Router.go('events')
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
				Router.go('home')
			});
			this.next()
		}
	}
});
