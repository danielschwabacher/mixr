import '../templates/forgotPasswordModal.html';
import '../templates/changePasswordModal.html';

Template.forgotPasswordModal.events({
  'submit .forgotPasswordModalForm'(event, template) {
    event.preventDefault();
    console.log('Fired from submit event');
    var userEmail = event.target.userEmailForgotPasswordModal.value;
    Accounts.forgotPassword(userEmail, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        console.log("Email successfully sent!");
      }
    });

    /*
    Meteor.call('sendForgotPassword', userEmail, function(error){
      if (error) {
        Modal.show("passwordChangeFailedModal")
        console.log("Error sending email")
      }
      else {
        Modal.hide(template)
        Modal.show("passwordChangedModal")
      }
  }
  */

});
