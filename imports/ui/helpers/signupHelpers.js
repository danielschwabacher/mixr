import '../templates/signupPage.html';
import '../templates/notificationModals.html';

//TODO: Implement email verification
Template.signupPage.events({
	'submit .registerForm'(event, template) {
		event.preventDefault();
		var firstName = event.target.firstName.value;
    var lastName = event.target.lastName.value;
		var email = event.target.emailSignup.value;
		var password = event.target.password.value;
		var passwordConfirm = event.target.passwordConfirm.value;
		var userProfileData = {
				username : email,
    		password : password,
    		email : email,
    		profile: {
      			first_name : firstName,
      			last_name : lastName,
						email_preference: '1' // 1 = receive emails.   0 = do NOT send emails
  			}
		};
		if (password == passwordConfirm){
			createNewMixrAccount(userProfileData)
		}
		else{
			Modal.show('passwordsDoNotMatchModal')
		}
	},
});

createNewMixrAccount = function(userData){
	var newUserCreated = Accounts.createUser(userData, function(err){
		if (err) {
			Modal.show('signupFailedModal')
			return;
		}
		else{
			// This sends a verification email to users
			Meteor.call('sendVerificationLink', (error, response) => {
				if (error) {
					console.log("Error sending verification email " + response);
				}
			});
			// Should this redirect to a "Please confirm account" page?
			Modal.show('signupSuccessModal')
		}
		return;
	});
}
