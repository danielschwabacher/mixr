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
		clientCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription, eventDateTime)
		// TODO: VALIDATE INPUT
		Router.go('pickLocation')
		console.log("event: " + clientCachedEvent)
		console.log("event JSON: " + JSON.stringify(clientCachedEvent))
	}
});
