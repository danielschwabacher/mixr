import '../templates/accountSettingsPage.html'
import './changePasswordModalHelpers.js'

Template.accountSettingsPage.events({
	'click #changePasswordLink'(event, template){
		Modal.show("changePasswordModal")
	}
});
