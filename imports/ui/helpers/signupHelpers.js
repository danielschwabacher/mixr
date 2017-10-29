import '../templates/signupPage.html';
import '../templates/notificationModals.html';
import '../../api/Notifications/notifyWrapper.js';
import '../templates/legalModals.html';

function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
}

//TODO: Implement email verification
Template.signupPage.events({
	'click #registerButton'(event, template) {
		event.preventDefault();
		var firstName = document.getElementById('firstName').value;
		var lastName = document.getElementById('lastName').value
		var email = document.getElementById('email').value
		var password = document.getElementById('password').value
		var passwordConfirm = document.getElementById('password_confirm').value
		if (firstName == ""){
			notify("First name is required", "danger", "center")
			return
		}
		if (lastName == ""){
			notify("Last name is required", "danger", "center")
			return
		}
		if (email == ""){
			notify("Email is required", "danger", "center")
			return
		}
		if (!validateEmail(email)){
			notify("Email is invalid", "danger", "center")
			return			
		}
		if (password == ""){
			notify("Password is required", "danger", "center")
			return
		}
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
	
	'click #privacyModalLink'(event){
			Modal.show('privacyModal')
		},
	'click #simplePrivacyModalLink'(event){
		Modal.show('simplePrivacyModal')
	},
	'click #termsModalLink'(event){
		Modal.show('termsModal')
	}

});

createNewMixrAccount = function(userData){
	var newUserCreated = Accounts.createUser(userData, function(err){
		if (err) {
			notify('Account could not be created, email already in use', "danger", "center")
		}
		else{
			// This sends a verification email to users
			Meteor.call('sendVerificationLink', function(err){
				if (err) {
					console.log("Error sending verification email " + err);
				}
				else{
					notify('Account created successfully, check your email', "success", "right")	
				}
			});
		}
		return;
	});
}
