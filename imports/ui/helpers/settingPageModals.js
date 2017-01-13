import '../templates/settingsPage.html'

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
		Meteor.call('unregisterEvent', self._id)
	}
});

Template.dynamicModalCreated.events({
	'click .deleteEventCreatedModal'(event, template){
		var self = this
		Meteor.call('deleteEvent', self._id)
	},
	'click .unregisterEventCreatedModal'(event, template){
		var self = this
		Meteor.call('unregisterEvent', self._id)
	},
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
	}
})
