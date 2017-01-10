import '../templates/notificationModals.html';
import './pickLocationHelpers.js'
import '../../api/DatabaseWrappers/EventWrapper.js'

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
		//TODO: ADD TO DATABASE -- TEST
		clientEventWrapper = new EventWrapper(fullEventToConfirm)
		clientEventWrapper.insertEvent()
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
