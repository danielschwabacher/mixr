import '../templates/notificationModals.html';
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
	'click .confirmEventButton'(event, template) {
		Meteor.call("insertEvent", fullEventToConfirm)
		Router.go('home')
		Session.set('hasCachedEvent', false)
		Session.set('clientMinimumCachedEvent', null)
		fullEventToConfirm = null
	},
	'click .pickDifferentLocationButton'(event, template){
		console.log("pick different location.")
	},
	'click .cancelEventButton'(event, template){
		Router.go('create')
		Session.set('hasCachedEvent', false)
		Session.set('clientMinimumCachedEvent', null)
		fullEventToConfirm = null
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
	}
});
