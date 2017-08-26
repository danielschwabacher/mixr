import '../templates/forgotPasswordModal.html';
import '../templates/changePasswordModal.html';
import '../../api/Notifications/notifyWrapper.js';

Template.forgotPasswordModal.events({
    'submit .forgotPasswordModalForm'(event, template) {
        event.preventDefault();
        var userEmail = event.target.userEmailForgotPasswordModal.value;
        Accounts.forgotPassword(userEmail, function(error) {
          if (error) {
              notify("Email could not be sent.", "danger", "center")
          } 
          else {
            notify("Email reset link sent!", "success", "right")
          }
        });
    }
});
