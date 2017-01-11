import '../templates/settingsPage.html'
import './changePasswordModalHelpers.js'

Template.settingsPage.onCreated(function(){

});
Template.settingsPage.events({
	'click .changePasswordLink'(event, template){
		Modal.show('changePasswordModal')
	}

});
