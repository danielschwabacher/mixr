import '../templates/changePasswordModal.html';
import '../templates/notificationModals.html';
// Adding in forgot password helpers here
import '../templates/forgotPasswordModal.html';

Template.changePasswordModal.events({
	'submit .changePasswordModalForm'(event, template) {
		event.preventDefault()
		var oldPassword = event.target.currentPasswordChangePasswordModal.value;
		var newPassword1 = event.target.newPassword1.value;
		var newPassword2 = event.target.newPassword2.value;
		if (newPassword1 == newPassword2){
			Accounts.changePassword(oldPassword, newPassword1, function(err){
				if (err){
					Modal.show("passwordChangeFailedModal");
				}
				else{
					Modal.hide(template)
					Modal.show("passwordChangedModal");
				}
			});
		}
		else{
			Modal.show('passwordsDoNotMatchModal');
		}
	}
});

// These are the events for the forgot password modal
Template.forgotPasswordModal.events({
  'submit .forgotPasswordModalForm'(event, template) {
    event.preventDefault()
    var userEmail = event.target.userEmail.value
    Meteor.call('sendForgotPassword', userEmail, function(err) {
      if (err){
        Modal.show("passwordResetFailedModal");
      }
      else{
        Modal.hide(template)
        Modal.show("resetLinkSentModal");
				Router.go('home')
      }
    });
  }
});
