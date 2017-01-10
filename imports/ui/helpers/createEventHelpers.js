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
		clientTempCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription, eventDateTime)
		// TODO: VALIDATE INPUT MAKE INPUTS REQUIRED
		// used to confirm route in IronRouter
		Session.set('hasCachedEvent', true)
		Session.set('clientMinimumCachedEvent', clientTempCachedEvent)
		Router.go('pickLocation')
	}
});
