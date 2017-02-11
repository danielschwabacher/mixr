import '../templates/mixrPrimaryMap.html';
import '../../api/mapHandlers/mainMap.js';
GLOBAL_MARKERS = []
Template.registerHelper('checkIfOnEventPage', function(){
	return Session.get('onPrimaryMap');
});

Template.mixrEventMap.onRendered(function(){
	Session.set('onPrimaryMap', true)
	GoogleMaps.ready('mixrMap', function(map) {
		var latLng = Geolocation.latLng();
        Tracker.autorun(() => {
			removeMarkers()
			includeTags = Session.get('tagFilterIncludes')
			timeFilter = Session.get('timeFilterHours')
			client_collection = EventCollection.find(
				{ event_tag: { $in: includeTags} }
			);
			client_collection.forEach(function(currentEvent){
				createMarker(map.instance, currentEvent)
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
