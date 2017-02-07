import '../templates/createEvent.html';
import '../../api/Event/cachedEvent.js';
import flatpickr from 'flatpickr'

Template.createEventPage.onRendered(function() {
	//flatpickr(".flatpickr");
	todayDate = new Date()
	console.log("year is: " + todayDate.getFullYear())
	$(".flatpickr").flatpickr({
		minDate: "today",
		maxDate: new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + 10)),
		enableTime: true
	});
});

Template.createEventPage.events({
	'submit .createEventForm'(event, template) {
		event.preventDefault()
		var eventName = event.target.eventName.value;
		var eventLocation = event.target.eventLocation.value;
		var eventDescription = event.target.eventDescription.value;
		var eventDateTime = event.target.eventDateTime.value;
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
		clientTempCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription, eventDateTime, eventTagShortened)
		clientTempCachedEvent.createReference()
		// TODO: VALIDATE INPUT MAKE INPUTS REQUIRED
		// used to confirm route in IronRouter
		Router.go('pickLocation')
	}
});
