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
  			}
		};
		if (password == passwordConfirm){
			createNewMixrAccount(userProfileData)
		}
		else{
			alert("Passwords do not match")
		}
	},
});

createNewMixrAccount = function(userData){
	var newUserCreated = Accounts.createUser(userData, function(err){
		if (err) {
			alert("Error: account could not be created.")
			return;
		}
		else{
			Modal.show('signupSuccessModal')
		}
		return;
	});
}
