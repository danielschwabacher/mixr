import '../templates/signupPage.html';
import '../templates/notificationModals.html';
import '../../api/Notifications/notifyWrapper.js';

//TODO: Implement email verification
Template.signupPage.events({
	'click #registerButton'(event, template) {
		event.preventDefault();
		var firstName = document.getElementById('firstName').value;
		var lastName = document.getElementById('lastName').value
		var email = document.getElementById('email').value
		var password = document.getElementById('password').value
		var passwordConfirm = document.getElementById('password_confirm').value
		var userProfileData = {
			username : email,
			password : password,
			email : email,
			profile: {
				first_name : firstName,
				last_name : lastName,
				custom_email_preferences: {
					create_event: 1,
					register_event: 1,
					event_deleted: 1
				}
			}
		};
		if (password == passwordConfirm){
			createNewMixrAccount(userProfileData)
		}
		else{
			notify("Passwords do not match", "danger", "center")
		}
	},
});

createNewMixrAccount = function(userData){
	var newUserCreated = Accounts.createUser(userData, function(err){
		if (err) {
			notify('Account could not be created, email already in use', "danger", "center")
		}
		else{
			// This sends a verification email to users
			Meteor.call('sendVerificationLink', (error, response) => {
				if (error) {
					console.log("Error sending verification email " + response);
				}
			});
			notify('Account created successfully', "success", "right")
		}
		return;
	});
}
