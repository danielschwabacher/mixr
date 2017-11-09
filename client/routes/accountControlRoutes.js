import '../../imports/ui/helpers/navbarHelpers.js';
import '../../imports/ui/helpers/signupHelpers.js';
import '../../imports/ui/helpers/loginHelpers.js';
import '../../imports/ui/helpers/loadingSpinnerHelpers.js';
import '../../imports/ui/helpers/verifyEmailHelpers.js';
import '../../imports/api/Notifications/notifyWrapper.js';
import './eventRoutes.js'


// if user is not already logged in, go to the signup page
Router.route('/signup', {
	onBeforeAction: function () {
		this.render("loadingSpinner")
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
		this.render("loadingSpinner")
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
			this.render("loadingSpinner")
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

Router.route('verificationError', {
	onBeforeAction: function(){
		this.render("VerificationPageError")
	}
});

VerificationController = RouteController.extend({
	onBeforeAction: function(){
		this.render('loadingSpinner')
		this.next()
	},
	attemptVerification: function(){
		console.log("token is: " + this.params.token)
		Accounts.verifyEmail(this.params.token, function(err){
		if (err){
			console.log("Could not verify" + err);
			Router.go('verificationError')
		}
		else{
			console.log("Email was verified!")
			Router.go("home")
			notify("Email was verified, enjoy the beta!", "success", "right")			
		}
	});
	}
});

Router.route('/verify/:token', {
	controller: 'VerificationController',
	path: '/verify/:token',
	action: 'attemptVerification'
});

Router.route('/verifyOverride', {
	onBeforeAction: function(){
		this.render("loadingSpinner")
		Meteor.call("manualOverrideEmailVerification", function(error, resp){
			if (resp == 1){
				Router.go("verificationError")
				notify("Email is already verified.", "success", "right")

			}
			if (resp == 0){
				Router.go("home")
				notify("Email was verified, enjoy the beta!", "success", "right")				
			}
			if (resp == 2){
				Router.go("verficationError")				
				notify("Unknown error, try again later", "danger", "center")				
			}
		});
	}
});