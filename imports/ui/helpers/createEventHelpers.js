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
		var eventSelectedTagActual = eventSelectedTag.attr('id');
		console.log("tag is: " + eventSelectedTagActual)
		clientTempCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription, eventDateTime)
		clientTempCachedEvent.createReference()
		// TODO: VALIDATE INPUT MAKE INPUTS REQUIRED
		// used to confirm route in IronRouter
		Router.go('pickLocation')
	}
});
