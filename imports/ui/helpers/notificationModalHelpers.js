import '../templates/notificationModals.html'
import './eventResponseModalHelpers.js'
import './pickLocationHelpers.js'
import '../templates/createEvent.html'

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
	returnEventTagType: function(){
		return fullEventToConfirm.eventTagType
	}
});

Template.confirmEventModal.events({
	'click .confirmEventButton'(event, template){
		var eventName = fullEventToConfirm.eventName
		var eventExpiration = fullEventToConfirm.eventTimeStamp
		Meteor.call("insertEvent", fullEventToConfirm, eventExpiration, function (err, didInsert){
			if (didInsert){
				Modal.show('eventCreatedSuccessModal')
				Meteor.call('sendCreatedEventEmail', eventName, function(err){
					if(err){
						console.log("Email notification for new event was NOT sent." + err)
					}
					else {
						console.log("Email notification for new event was successfully sent!")
					}
				});
			}
			else{
				Modal.show('eventNotCreatedModal')
			}
		});
		Router.go('home')
		fullEventToConfirm.removeReference()
		fullEventToConfirm = null
	},
	'click .cancelEventButton'(event, template){
		Router.go('create')
		fullEventToConfirm.removeReference()
		fullEventToConfirm = null
		eventName = null
	}
});

Template.eventInformationModal.events({
	'click .registerEventButton'(event, template){
		if (Meteor.user() && Meteor.user().emails[0].verified){
			Meteor.call("registerEvent", this, function(err, didRegister){
				if (didRegister){
					Modal.show("eventDidRegisterModal")
				}
				else{
					Modal.show("eventAlreadyRegisteredModal")
				}
			});
		}
		else {
			Modal.show("emailNotVerifiedModal")
		}
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
	getMarkerEventTag: function(){
		return this.event_tag
	},
	getMarkerEventNumberRegistered: function(){
		return this.number_of_users_attending
	}
});
