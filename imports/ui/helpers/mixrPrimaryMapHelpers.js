import '../templates/mixrPrimaryMap.html';
import '../../api/mapHandlers/mainMap.js';
import '../../api/Time/converter.js'
import { EJSON } from 'meteor/ejson'
GLOBAL_MARKERS = []
MAP = 0
ALL_SHOWN_EVENTS = 0
// global helper to see if current path is event page
Template.registerHelper('checkIfOnEventPage', function(){
	return Session.get('onPrimaryMap');
});
// helper function to display all events in ALL_SHOWN_EVENTS
showAllEvents = function(event_list, map_instance){
	event_list.forEach(function(currentEvent){
		temp_marker = new Marker(map_instance, currentEvent)
		temp_marker.createObjectMarker()
	});
}
Template.mixrEventMap.onCreated(function(){
	this.eventsCollection = this.subscribe('events');
});

Template.mixrEventMap.onRendered(function(){
	Session.set('onPrimaryMap', true)
	GoogleMaps.ready('mixrMap', function(map) {
		console.log("map is ready")
		MAP = map.instance
		var latLng = Geolocation.latLng();
        Tracker.autorun(() => {
			removeMarkers()
			includeTags = Session.get('tagFilterIncludes')
			timeFilter = Session.get('timeFilterHours')
			currentUnixTime = moment().unix()
			additionalSeconds = hoursToSeconds(timeFilter)
			unixTimeRange = currentUnixTime + additionalSeconds
			ALL_SHOWN_EVENTS = EventCollection.find(
				{
					event_tag: { $in: includeTags},
					event_timestamp: {$lte: unixTimeRange}
				}
			);
			// Session.set('cachedEventsToDisplay', EJSON.clone(ALL_SHOWN_EVENTS))
			showAllEvents(ALL_SHOWN_EVENTS, map.instance)
        });
	});
});

Template.mixrEventMap.onDestroyed(function(){
	Session.set('onPrimaryMap', false)
});

Template.mixrEventMap.helpers({
	initPrimaryEventMapOptions: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				draggable: true,
				scrollwheel: true,
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});

Template.eventDisplay.helpers({
	// returns an array of objects representing the object
	'getEvents': function(tags, time){
		var eventsArray = []
		currentUnixTime = moment().unix()
		additionalSeconds = hoursToSeconds(time)
		unixTimeRange = currentUnixTime + additionalSeconds
		displayEvents = EventCollection.find(
			{
				event_tag: { $in: tags},
				event_timestamp: {$lte: unixTimeRange}
			}
		);
		displayEvents.forEach(function(currentDoc){
			eventsArray.push(currentDoc)
		});
		return eventsArray
    },
	'returnSessionTags': function(){
		return Session.get('tagFilterIncludes')

	},
	'returnSessionTimes': function(){
		return Session.get('timeFilterHours')
	},
});

Template.eventSection.events({
	"click #eventSectionRegisterButton"(event, template){
		if (Meteor.user() && Meteor.user().emails[0].verified){
			Meteor.call("registerEvent", this, function(err, didRegister){
				if (didRegister){
					notify("Registered successfully!", "success", "right")
				}
				else{
					notify("Error: You are already registered for this event", "danger", "center")
				}
			});
		}
		else {
			Modal.show("emailNotVerifiedModal")
		}
	},
	"click #eventSectionMoreInfoButton"(event, template){
		Modal.show('eventInformationModal', this)
	},
	"mouseenter .event-section-clickable-area"(event, template) {
		removeMarkers()
		singleMarker = EventCollection.find(
			{
				_id: this._id
			}
		);
		singleMarker.forEach(function(currentEvent){
			temp_marker = new Marker(MAP, currentEvent)
			temp_marker.createObjectMarker()
		});
	},
	"mouseleave .event-section-clickable-area"(event,template){
		showAllEvents(ALL_SHOWN_EVENTS, MAP)
	}
});
