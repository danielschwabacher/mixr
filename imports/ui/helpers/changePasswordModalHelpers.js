import '../templates/changePasswordModal.html';
import '../templates/notificationModals.html';
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
