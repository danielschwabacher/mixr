import '../templates/settingsPage.html'
import './settingPageModals.js'
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

Template.manageEventsPanel.helpers({
	'getOwnedEventIds': function(){
		var userEventsOwned = UserEventsCrossReferenceCollection.findOne({user: Meteor.userId()},{fields: {'owned_events.eventId': 1}})
		if (userEventsOwned.owned_events){
			ownedEventsId = []
			for (i = 0; i < userEventsOwned['owned_events'].length; i++){
				ownedEventsId.push({eventId: userEventsOwned['owned_events'][i].eventId})
			}
			return ownedEventsId
		}
		else{
			return 0
		}
    },
	'getRegisteredEventIds': function(){
		var usersEventsRegistered = UserEventsCrossReferenceCollection.findOne({user: Meteor.userId()},{fields: {'registered_events.eventId': 1}})
		if (usersEventsRegistered.registered_events){
			registeredEventIds = []
			for (i = 0; i < usersEventsRegistered['registered_events'].length; i++){
				registeredEventIds.push({eventId: usersEventsRegistered['registered_events'][i].eventId})
			}
			return registeredEventIds
		}
		else {
			return 0
		}
	},
	'getAssociatedEventNames': function(eventIdsObj){
		eventIdsObjWithOwned = eventIdsObj
		eventIds = []
		eventNames = []
		if (eventIdsObj){
			for (i = 0; i < eventIdsObj.length; i++){
				eventIds.push(eventIdsObj[i].eventId)
			}
			eventNamesObj = EventCollection.find(
				{ _id: { $in: eventIds} },
				{ fields: {event_name: 1, owned: 1} }
			)
			eventNamesObj.forEach(function(item){
				eventNames.push( {eventName: item.event_name, eventId: item._id} )
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
