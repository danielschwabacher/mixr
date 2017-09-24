import '../templates/manageEventsPage.html';
import '../../api/Notifications/notifyWrapper.js';

/*
Template.manageEventLoader.onRendered(function(){

});
*/

Template.manageEventsPanel.onCreated(function(){
	this.crossReferenceCollection = this.subscribe('userEventsCrossReference');
	this.eventsCollection = this.subscribe('events');
});


Template.manageEventsPanel.onRendered(function(){

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
				return []
			}
	}
});

Template.eventRegisteredNameHolder.events({
	'click .nameLinkRegistered'(event, template){
		context = this
		eventInfo = EventCollection.findOne({_id: context.eventId})
		if (eventInfo){
			Modal.show('dynamicModalRegistered', eventInfo)
		}
	}
});

Template.eventCreatedNameHolder.events({
	'click .nameLinkCreated'(event, template){
		context = this
		eventInfo = EventCollection.findOne({_id: context.eventId})
		if (eventInfo){
			Modal.show('dynamicModalCreated', eventInfo)
		}
	}
});

Template.dynamicModalRegistered.events({
	'click .unregisterEventRegisteredModal'(event, template){
		var self = this
		// notify("Working...", "info", "right")		
		Meteor.call('unregisterEvent', self._id, function(error, result){
			if (result){
				notify("Unregistered successfully!", "success", "right")
			}
			else{
				notify("Error: Could not unregister from event, please try again.", "danger", "center")
			}			
		});
	}
});

Template.dynamicModalCreated.events({
	'click .deleteEventCreatedModal'(event, template){
		var self = this
		notify("Working...", "info", "right")
		Meteor.call('deleteEvent', self._id, function(error, result) {
			if (result){
				$.notifyClose();
				notify("Event deleted successfully!", "success", "right")
			}
			else{
				$.notifyClose();				
				notify("Error: Could not delete event, please try again.", "danger", "center")
			}
		});
	}
});



Template.dynamicModalRegistered.helpers({
	returnContextualEventName: function(){
			return this.event_name
	},
	returnContextualEventLocation: function(){
		return this.event_location
	},
	returnContextualEventLocation: function(){
		return this.event_location
	},
	returnContextualEventDescription: function(){
		return this.event_description
	},
	returnContextualEventDateTime: function(){
		return this.event_dateTime
	},
	returnContextualNumberAttending: function(){
		return this.number_of_users_attending
	},
	returnMaxNumberAttending: function(){
		return this.event_max_number
	}
});

Template.dynamicModalCreated.helpers({
	returnContextualEventName: function(){
			return this.event_name
	},
	returnContextualEventLocation: function(){
		return this.event_location
	},
	returnContextualEventLocation: function(){
		return this.event_location
	},
	returnContextualEventDescription: function(){
		return this.event_description
	},
	returnContextualEventDateTime: function(){
		return this.event_dateTime
	},
	returnContextualNumberAttending: function(){
		return this.number_of_users_attending
	},
	returnMaxNumberAttending: function(){
		return this.event_max_number
	}
})
