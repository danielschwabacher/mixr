import '../templates/loginPage.html';
Template.loginPage.onCreated(function helloOnCreated() {
	console.log("login page created")
});

Template.loginPage.events({
	'submit .loginForm'(event, template) {
		event.preventDefault()
		var loginEmail = event.target.emailLogin.value;
		var loginPassword = event.target.passwordLogin.value;
		attemptLoginClient(loginEmail, loginPassword)
	}
});

function attemptLoginClient(email, pwd){
	Meteor.loginWithPassword(email, pwd, function(err){
		if (err) {
			console.log("Invalid username or password.")
		}
	});
}
