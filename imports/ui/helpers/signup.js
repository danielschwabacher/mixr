import '../templates/signupPage.html';

Template.signupPage.onCreated(function helloOnCreated() {
	console.log("signup page created")
});

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
		createNewMixrAccount(userProfileData)
		sendVerificationLink()
	},
});

// This method verifies user emails but doesn't force them
// to verify before logging in.
sendVerificationLink = function() {
	let userID = Meteor.userId();
	if (userID) {
		return Accounts.sendVerificationEmail(userID);
	}
	console.log("email sent?")
}
createNewMixrAccount = function(userData){
	var newUserCreated = Accounts.createUser(userData, function(err){
		if (err) {
			console.log("Account creation failed. ")
		}
		else {
			console.log("account created.")
		}
	});
	console.log("new account info: " + newUserCreated)
}
