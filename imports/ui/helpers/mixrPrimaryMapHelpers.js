import '../templates/mixrPrimaryMap.html';
import '../../api/mapHandlers/mainMap.js';
import '../../api/Time/converter.js'
GLOBAL_MARKERS = []

Template.registerHelper('checkIfOnEventPage', function(){
	return Session.get('onPrimaryMap');
});

Template.mixrEventMap.onCreated(function(){
	this.eventsCollection = this.subscribe('events');
});

Template.mixrEventMap.onRendered(function(){
	Session.set('onPrimaryMap', true)
	GoogleMaps.ready('mixrMap', function(map) {
		var latLng = Geolocation.latLng();
        Tracker.autorun(() => {
			removeMarkers()
			includeTags = Session.get('tagFilterIncludes')
			timeFilter = Session.get('timeFilterHours')
			currentUnixTime = moment().unix()
			additionalSeconds = hoursToSeconds(timeFilter)
			unixTimeRange = currentUnixTime + additionalSeconds
			client_collection = EventCollection.find(
				{
					event_tag: { $in: includeTags},
					event_timestamp: {$lte: unixTimeRange}
				}
			);
			client_collection.forEach(function(currentEvent){
				temp_marker = new Marker(map.instance, currentEvent)
				temp_marker.createObjectMarker()
			});
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
	'getEvents': function(){
		eventsArray = []
		allEvents = EventCollection.find({});
		allEvents.forEach(function(currentDoc){
			eventsArray.push(currentDoc)
		});
		return eventsArray
    },
	returnContextualEventName: function(){
		return this.event_name
	},
	returnContextualEventLocation: function(){
		return this.event_location
	},
	returnContextualEventLocation: function(){
		return this.event_location
	},
	returnContextualEventDescription: function(){
		return this.event_description
	},
	returnContextualEventDateTime: function(){
		return this.event_dateTime
	},
	returnContextualNumberAttending: function(){
		return this.number_of_users_attending
	}
});

Template.eventSection.events({
	"mouseover .clickableArea"(event, template) {
		console.log(this._id)
	}
});
