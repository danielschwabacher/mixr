import '../templates/notificationModals.html'
import './eventResponseModalHelpers.js'
import './pickLocationHelpers.js'
import '../templates/createEvent.html'
import '../../api/Notifications/notifyWrapper.js';

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
	},
	returnMaxNumber: function(){
		return fullEventToConfirm.eventMaxRegistered
	},
});

Template.confirmEventModal.events({
	'click .confirmEventButton'(event, template){
		var eventName = fullEventToConfirm.eventName
		var eventExpiration = fullEventToConfirm.eventTimeStamp
		Meteor.call("insertEvent", fullEventToConfirm, eventExpiration, function (err, didInsert){
			if (didInsert){
				notify("Event created successfully!", "success", "right")
				Meteor.call('sendCreatedEventEmail', eventName, function(err){
					if(err){
						notify("Error: Could not send event reference email", "danger", "center")
					}
					else {
						notify("Event reference email sent!", "success", "right")
					}
				});
			}
			else{
				notify("Error: Could not create event, please try again", "danger", "center")
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
				if (didRegister == 1){
					notify("Registered successfully!", "success", "right")
				}
				else if (didRegister == 0){
					notify("Error: You are already registered for this event", "danger", "center")
				}
				else if (didRegister == -1){
					notify("Error: event is full", "danger", "center")
				}
				else{
					notify("Unknown error, please try again later.", "danger", "center")
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
	},
	returnMaxNumber: function(){
		return this.event_max_number
	},
});
