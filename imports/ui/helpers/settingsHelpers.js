import '../templates/settingsPage.html'
import './changePasswordModalHelpers.js'
Template.settingsPage.onCreated(function () {
	Session.set('default', true)
});

Template.leftSettingsPane.events({
	'click .changePasswordLink'(event, template){
		Modal.show('changePasswordModal')
	},
	'click .mapSettingsLink'(event, template){
		setMapSettings()
	},
	'click .manageEventsLink'(event, template){
		setManageEvents()
	}
});

Template.activeContent.helpers({
  	getCurrentFocus: function(){
 		return Session.get('default') ? 'mapSettingsPanel' : 'manageEventsPanel'
  	}
});

Template.mapSettingsPanel.onCreated(function(){
});

Template.manageEventsPanel.onCreated(function(){
	console.log(UserEventsCrossReferenceCollection.findOne())
	Meteor.subscribe("ownedEvents", function() {
		console.log("after subscribed: ")
		var client_cross_reference = UserEventsCrossReferenceCollection.find();
		console.log(UserEventsCrossReferenceCollection.findOne())
	});
});

setManageEvents = function(){
	Session.set('default', false)
}
setMapSettings = function(){
	Session.set('default', true)
}
