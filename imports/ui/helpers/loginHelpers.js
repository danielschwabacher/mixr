import '../templates/loginPage.html';
import '../templates/notificationModals.html';
import '../templates/forgotPasswordModal.html';
Template.loginPage.events({
	'submit .loginForm'(event, template) {
		event.preventDefault()
		var loginEmail = event.target.emailLogin.value;
		var loginPassword = event.target.passwordLogin.value;
		attemptLoginClient(loginEmail, loginPassword)
	},

	'click .forgotPassword'(event) {
		event.preventDefault()
		Modal.show('forgotPasswordModal')
	}
});

function attemptLoginClient(email, pwd){
	Meteor.loginWithPassword(email, pwd, function(err){
		if (err) {
			Modal.show('loginFailedNotification')
		}
		else{
			Router.go('events')
		}
	});
}
