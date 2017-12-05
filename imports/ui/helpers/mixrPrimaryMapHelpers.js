import '../templates/mixrPrimaryMap.html';
import '../templates/applyEventFilterModals.html'
import '../templates/mapModal.html'
import '../../api/mapHandlers/mainMap.js';
import '../../api/Time/converter.js'
import { EJSON } from 'meteor/ejson'
import '../templates/mapModal.html';
GLOBAL_MARKERS = []
MAP = 0
ALL_SHOWN_EVENTS = 0
ALL_SHOWN_EVENTS_SCRAPED = []

// helper function to display all events in ALL_SHOWN_EVENTS
showAllEvents = function(event_list, map_instance){
	event_list.forEach(function(currentEvent){
		temp_marker = new Marker(map_instance, currentEvent, false)
		temp_marker.createObjectMarker()
	});
}


clearMarkerLists = function(){
	ALL_SHOWN_EVENTS = []
	ALL_SHOWN_EVENTS.length = 0

	ALL_SHOWN_EVENTS_SCRAPED = []
	ALL_SHOWN_EVENTS_SCRAPED.length = 0
}
Template.mixrEventMap.onCreated(function(){
	this.eventsCollection = this.subscribe('events');
});

Template.mixrEventMap.onRendered(function(){
	GoogleMaps.ready('mixrMap', function(map) {
		MAP = map.instance
		var latLng = Geolocation.latLng();

		// Lat, Lng coordinate pairs which define the Boulder area
		// bounding box.
		var BOULDER_BOUNDS = new google.maps.LatLngBounds(
			// Southwest bound
     		new google.maps.LatLng(39.964069, -105.301758),
			// Northeast bound
     		new google.maps.LatLng(40.094551, -105.178197)

		);
		var lastValidCenter = MAP.getCenter();

		if (!BOULDER_BOUNDS.contains(MAP.getCenter())){
			Router.go("error")
		}


		google.maps.event.addListener(MAP, 'dragend', function() {
			if (BOULDER_BOUNDS.contains(MAP.getCenter())) {
				// still within valid bounds, so save the last valid position
				lastValidCenter = MAP.getCenter();
				return;
			}
			else{
				// not valid anymore => return to last valid position
				MAP.panTo(lastValidCenter);
				notify("This beta only supports Boulder locations!", "info", "center")
			}
		});

		Tracker.autorun(() => {
			includeTags = Session.get('tagFilterIncludes')
			timeFilter = Session.get('timeFilterHours')
			currentUnixTime = moment().unix()
			additionalSeconds = hoursToSeconds(timeFilter)
			unixTimeRange = currentUnixTime + additionalSeconds
			clearMarkerLists()
			ALL_SHOWN_EVENTS = EventCollection.find(
				{
					event_tag: { $in: includeTags},
					event_timestamp: {$lte: unixTimeRange},

				}
			);
			ALL_SHOWN_EVENTS.forEach(
				function(doc) {
					if (doc.number_of_users_attending < doc.event_max_number){
						ALL_SHOWN_EVENTS_SCRAPED.push(doc)
					}
				}
			);
			removeMarkers()
			showAllEvents(ALL_SHOWN_EVENTS_SCRAPED, MAP)
		});
	});
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

Session.set('sidebarIds', null)

Template.eventDisplay.helpers({
	/*
		This is for the sidebar part of the map display.
		It returns an array of objects representing the events
		to display.

		If id is null, then no marker is hovered over,
		hence all the events are displayed.

		Only selects tags and times.
	*/
	'getEvents': function(tags, time, id){
		sidebarId = Session.get('sidebarIds')
		var eventsArray = []
		currentUnixTime = moment().unix()
		additionalSeconds = hoursToSeconds(time)
		unixTimeRange = currentUnixTime + additionalSeconds
		if (sidebarId){
			displayEvents = EventCollection.find(
				{
					_id: sidebarId,
					event_tag: { $in: tags},
					event_timestamp: {$lte: unixTimeRange}
				}
			);
		}
		else{
			displayEvents = EventCollection.find(
				{
					event_tag: { $in: tags},
					event_timestamp: {$lte: unixTimeRange}
				}
			);
		}
		displayEvents.forEach(function(currentDoc){
			if (currentDoc.number_of_users_attending < currentDoc.event_max_number){
				eventsArray.push(currentDoc)
			}
		});
		return eventsArray
    },
	'returnSessionTags': function(){
		return Session.get('tagFilterIncludes')

	},
	'returnSessionTimes': function(){
		return Session.get('timeFilterHours')
	},
	'returnSessionSidebarIds': function(){
		return Session.get('sidebarIds')
	}
});

Template.eventSection.events({
	"click #eventSectionRegisterButton"(event, template){
		notify("Registering...", "info", "right")
		if (Meteor.user() && Meteor.user().emails[0].verified){
			Meteor.call("registerEvent", this, function(err, didRegister){
				if (didRegister == 1){
					$.notifyClose();
					notify("Registered successfully!", "success", "right")
				}
				else if (didRegister == 0){
					$.notifyClose();
					notify("Error: You are already registered for this event", "danger", "center")
				}
				else if (didRegister == -1){
					$.notifyClose();
					notify("Error: event is full", "danger", "center")
				}
				else{
					$.notifyClose();
					notify("Unknown error, please try again later.", "danger", "center")
				}
			});
		}
		else {
			Modal.show("emailNotVerifiedModal")
		}
	},
	"click #eventSectionMoreInfoButton"(event, template){
		// Session.set("modalContext", template)
		Modal.show('eventInformationModal', this)
	},
	"click #eventSectionViewMapButton"(event, template){
		Modal.show('mapModal')
	},
	"mouseenter .event-section-clickable-area"(event, template) {
		removeMarkers()
		singleMarker = EventCollection.find(
			{
				_id: this._id
			}
		);
		if (MAP != 0){
			singleMarker.forEach(function(currentEvent){
				temp_marker = new Marker(MAP, currentEvent, false)
				temp_marker.createObjectMarker()
			});
		}
	},
	"mouseleave .event-section-clickable-area"(event,template){
		showAllEvents(ALL_SHOWN_EVENTS_SCRAPED, MAP)
	},
});

Template.applyEventFiltersSection.events({
	"click .sortByTagDropDown"(event){
		event.preventDefault()
		Modal.show('sortByTagsEventFilterModal')
	},
	"click .sortByTimeDropDown"(event){
		event.preventDefault()
		Modal.show('sortByTimeEventFilterModal')
	}
});







/*
	This is for the embedded map modal stuff.
	Meteor was not detecting this is a seperate file,
	so it'll be here for now.
*/
/*
Template.mapModal.helpers({
	initModalMap: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				context: this,
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
*/