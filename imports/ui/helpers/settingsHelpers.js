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
	//console.log("first owned event: " + JSON.stringify(client_users_events['owned_events'][0]['eventId']))
});
Template.manageEventsPanel.helpers({
	'getOwnedEventIds': function(){
		users_events = UserEventsCrossReferenceCollection.findOne({user: Meteor.userId()},{fields: {'owned_events.eventId': 1}})
		if (users_events){
			ownedEventsId = []
			for (i = 0; i < users_events['owned_events'].length; i++){
				ownedEventsId.push({eventId: users_events['owned_events'][i].eventId})
			}
			return ownedEventsId
		}
		else{
			return 0
		}
    },
	'getRegisteredEventIds': function(){
		users_events = UserEventsCrossReferenceCollection.findOne({user: Meteor.userId()},{fields: {'registered_events.eventId': 1}})
		if (users_events){
			registeredEventIds = []
			for (i = 0; i < users_events['registered_events'].length; i++){
				registeredEventIds.push({eventId: users_events['registered_events'][i].eventId})
			}
			return registeredEventIds
		}
		else{
			return 0
		}
	},
	'getAssociatedEventNames': function(eventIdsObj){
		eventIds = []
		eventNames = []
		if (eventIdsObj){
			for (i = 0; i < eventIdsObj.length; i++){
				eventIds.push(eventIdsObj[i].eventId)
			}
			eventNamesObj = EventCollection.find(
				{ _id: { $in: eventIds} },
				{ fields: {event_name: 1} }
			)
			eventNamesObj.forEach(function(item){
				eventNames.push({eventName: item.event_name})
			});
			return eventNames
		}
		else{
			return [{eventName: "You have no events"}]
		}
	}
});


setManageEvents = function(){
	Session.set('default', false)
}
setMapSettings = function(){
	Session.set('default', true)
}
