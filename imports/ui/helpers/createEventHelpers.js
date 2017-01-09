import '../templates/createEvent.html';
import '../../api/Event/cachedEvent.js';

Template.createEventPage.events({
	'submit .createEventForm'(event, template) {
		event.preventDefault()
		var eventName = event.target.eventName.value;
		var eventLocation = event.target.eventLocation.value;
		var eventDescription = event.target.eventDescription.value;
		clientCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription)
		console.log("event: " + clientCachedEvent)
		console.log("event JSON: " + JSON.stringify(clientCachedEvent))
	}
});
