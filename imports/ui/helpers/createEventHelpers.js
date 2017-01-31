import '../templates/createEvent.html';
import '../../api/Event/cachedEvent.js';

Template.createEventPage.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
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
			eventTagShortened = "Sports"
		}
		else if (literalEventTag == "performancesRadioButton"){
			eventTagShortened = "Performances"
		}
		else if (literalEventTag == "artsRadioButton"){
			eventTagShortened = "Arts"
		}
		else if (literalEventTag == "academicInterestRadioButton"){
		eventTagShortened = "Academic Interest"
		}
		else if (literalEventTag == "otherRadioButton"){
			eventTagShortened = "Other"
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
