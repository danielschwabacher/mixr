import '../templates/mixrSampleMap.html';
import '../../api/Notifications/notifyWrapper.js';
import '../../api/mapHandlers/mainMap.js';

ALL_SHOWN_EVENTS = []
ALL_SHOWN_EVENTS_SCRAPED = []

Template.mixrSampleMap.onCreated(function(){
    this.eventsCollection = this.subscribe('events');
});

// helper function to display all events in ALL_SHOWN_EVENTS
showAllSampleEvents = function(event_list, map_instance){
	event_list.forEach(function(currentEvent){
		sample_marker = new Marker(map_instance, currentEvent, true)
		sample_marker.createObjectMarker()
	});
}

Template.mixrSampleMap.onRendered(function(){
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

        ALL_SHOWN_EVENTS = EventCollection.find();

        ALL_SHOWN_EVENTS.forEach(
            function(doc) {
                if (doc.number_of_users_attending < doc.event_max_number){
                    ALL_SHOWN_EVENTS_SCRAPED.push(doc)
                }
            }
        );

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
        showAllSampleEvents(ALL_SHOWN_EVENTS_SCRAPED, MAP)
	});
});

Template.mixrSampleMap.helpers({
	initSampleEventMapOptions: function() {
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


Template.eventDisplaySample.events({
    'click #eventSectionSampleRegister'(event, template){
        Router.go("signup");
    }
});
    
Template.sampleEventInfoModal.events({
    'click #signupButton'(event, template){
        Router.go("signup");
    }
});
    
Template.eventDisplaySample.helpers({
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
				}
			);
		}
		else{
			displayEvents = EventCollection.find();
		}
		displayEvents.forEach(function(currentDoc){
			if (currentDoc.number_of_users_attending < currentDoc.event_max_number){
				eventsArray.push(currentDoc)
			}
		});
		return eventsArray
    },
	'returnSessionSidebarIds': function(){
		return Session.get('sidebarIds')
	}
});