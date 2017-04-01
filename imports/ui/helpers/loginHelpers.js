import '../templates/loginPage.html';
import '../templates/notificationModals.html';
import '../templates/forgotPasswordModal.html';
Template.loginPage.events({
	'click #loginButton'(event, template) {
		event.preventDefault()
		var loginEmail = document.getElementById('emailLogin').value
		var loginPassword =  document.getElementById('passwordLogin').value
		attemptLoginClient(loginEmail, loginPassword)
	},

	'click .forgotPasswordLink'(event, template){
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
