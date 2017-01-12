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
	Meteor.subscribe("userEventsCrossReference", function(){
		client_users_events = UserEventsCrossReferenceCollection.findOne(
			{
				user: Meteor.userId(),
			},
			{
				fields: { '_id': 0,'owned_events.eventId': 1 }
			}
		)
		Session.set('ownedEvents', client_users_events)
		//console.log("first owned event: " + JSON.stringify(client_users_events['owned_events'][0]['eventId']))
	});
});

Template.manageEventsPanel.helpers({
	getOwnedEvents: function(){
		return JSON.stringify(Session.get('ownedEvents'))
	},
	events: [
		{ text: 'This is event 1' },
		{ text: 'This is event 2' },
		{ text: 'This is event 3' },
	]
});


setManageEvents = function(){
	Session.set('default', false)
}
setMapSettings = function(){
	Session.set('default', true)
}
