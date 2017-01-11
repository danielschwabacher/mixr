import '../templates/notificationModals.html';
import './eventResponseModalHelpers.js'
import './pickLocationHelpers.js'

Template.confirmEventModal.helpers({
	returnEventName: function() {
		return fullEventToConfirm.eventName
	},
	returnLocation: function() {
		return fullEventToConfirm.eventLoc
	},
	returnDescription: function() {
		return fullEventToConfirm.eventDescription
	},
	returnDateTime: function() {
		return fullEventToConfirm.eventDateTime
	},
	returnCoordinates: function(){
		return JSON.stringify(fullEventToConfirm.coordinates)
	}
});

Template.confirmEventModal.events({
	'click .confirmEventButton'(event, template){
		Meteor.call("insertEvent", fullEventToConfirm, function (err, didInsert){
			if (didInsert){
				Modal.show('eventCreatedSuccessModal')
			}
			else{
				Modal.show('eventNotCreatedModal')
			}
		});
		Router.go('home')
		Session.set('hasCachedEvent', false)
		Session.set('clientMinimumCachedEvent', null)
		fullEventToConfirm = null
	},
	'click .cancelEventButton'(event, template){
		Router.go('create')
		Session.set('hasCachedEvent', false)
		Session.set('clientMinimumCachedEvent', null)
		fullEventToConfirm = null
	}
});

Template.eventInformationModal.events({
	'click .registerEventButton'(event, template){
		Meteor.call("registerEvent", this, function(err, didRegister){
			if (didRegister){
				Modal.show("eventDidRegisterModal")
			}
			else{
				Modal.show("eventAlreadyRegisteredModal")
			}
		});
	}
});


// data context is now the database collection
Template.eventInformationModal.helpers({
	getMarkerEventName: function(){
		return this.event_name
	},
	getMarkerEventLocation: function(){
		return this.event_location
	},
	getMarkerEventDescription: function(){
		return this.event_description
	},
	getMarkerEventDateTime: function(){
		return this.event_dateTime
	},
	getMarkerEventNumberRegistered: function(){
		return this.number_of_users_attending
	}
});
