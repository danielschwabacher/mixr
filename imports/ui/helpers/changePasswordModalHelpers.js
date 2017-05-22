import '../templates/changePasswordModal.html';
import '../templates/notificationModals.html';
// Adding in forgot password helpers here
import '../templates/forgotPasswordModal.html';
import '../../api/Notifications/notifyWrapper.js';

Template.changePasswordModal.events({
	'submit .changePasswordModalForm'(event, template) {
		event.preventDefault()
		var oldPassword = event.target.currentPasswordChangePasswordModal.value;
		var newPassword1 = event.target.newPassword1.value;
		var newPassword2 = event.target.newPassword2.value;
		if (newPassword1 == newPassword2){
			Accounts.changePassword(oldPassword, newPassword1, function(err){
				if (err){
					notify("Your password is incorrect", "danger", "center")
				}
				else{
					Modal.hide()
					notify("Password changed successfully!", "success", "right")
				}
			});
		}
		else{
			notify("Passwords do not match", "danger", "center")
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
		  notify("Invalid email: link was not sent", "danger", "center")
      }
      else{
        Modal.hide(template)
       	notify("Email reset link sent!", "success", "right")
		Router.go('home')
      }
    });
  }
});
