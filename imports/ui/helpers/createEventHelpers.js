import '../templates/createEvent.html';
import '../../api/Event/cachedEvent.js';

Template.createEventPage.onRendered(function() {
	todayDate = new Date()
    $('.datetimepicker').datetimepicker({
		minDate: todayDate,
		maxDate: new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + 10)),
		allowInputToggle: true,
		stepping: 5,
		format: "ddd, MMM Do, h:mmA",
    });
});

Template.createEventPage.events({
	'submit .createEventForm'(event, template) {
		event.preventDefault()
		var eventName = event.target.eventName.value;
		var eventLocation = event.target.eventLocation.value;
		var eventDescription = event.target.eventDescription.value;
		var eventDateTime = event.target.eventDateTime.value;
		var eventTimeStamp = moment(eventDateTime, "ddd, MMM Do, h:mmA").unix()

		var eventSelectedTag = $("input[type='radio']:checked");
		var literalEventTag = eventSelectedTag.attr('id');
		var eventTagShortened = "null"

		if (literalEventTag == "sportsRadioButton"){
			eventTagShortened = "sports"
		}
		else if (literalEventTag == "performancesRadioButton"){
			eventTagShortened = "performances"
		}
		else if (literalEventTag == "artsRadioButton"){
			eventTagShortened = "arts"
		}
		else if (literalEventTag == "academicInterestRadioButton"){
		eventTagShortened = "academicInterest"
		}
		else if (literalEventTag == "otherRadioButton"){
			eventTagShortened = "other"
		}
		else{
			eventTagShortened = "Could not find tag"
		}

		clientTempCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription, eventDateTime, eventTimeStamp, eventTagShortened)
		clientTempCachedEvent.createReference()
		// console.log("timestamp in object: " + clientTempCachedEvent.eventTimeStamp)
		// TODO: VALIDATE INPUT MAKE INPUTS REQUIRED
		// used to confirm route in IronRouter
		Router.go('pickLocation')
	},
	'click #resendEmailButton'(event, template) {
		Meteor.call('sendVerificationLink', (error, response) => {
 			if (error) {
				console.log("Error sending verification email " + response);
			}
		});
		Router.go('home')
	}

});


Template.createEventPage.helpers({
	isVerified: function(){
		return Meteor.user().emails[0].verified
	}
});



Template.emailNotVerifiedModal.events({
	'click #resendVerificationLink'(event, template){
		Meteor.call('sendVerificationLink', (error, response) => {
			if (error) {
				console.log("Error sending verification email " + response);
			}
		});
		Router.go('home')
	}
});
