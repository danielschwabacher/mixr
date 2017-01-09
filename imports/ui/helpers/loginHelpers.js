import '../templates/loginPage.html';

Template.loginPage.events({
	'submit .loginForm'(event, template) {
		event.preventDefault()
		var loginEmail = event.target.emailLogin.value;
		var loginPassword = event.target.passwordLogin.value;
		var loginAttempt = attemptLoginClient(loginEmail, loginPassword)
		if (loginAttempt){
			console.log("logged in")
		}
	}
});

function attemptLoginClient(email, pwd){
	Meteor.loginWithPassword(email, pwd, function(err){
		if (err) {
			console.log("Invalid username or password.")
			return 0
		}
	});
	return 1
}
