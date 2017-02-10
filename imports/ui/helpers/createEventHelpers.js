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
