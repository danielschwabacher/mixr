import '../templates/mixrPrimaryMap.html';
import '../../api/mapHandlers/mainMap.js'

Template.mixrEventMap.onCreated(function(){
	GoogleMaps.ready('mixrMap', function(map) {
		var latLng = Geolocation.latLng();
		Meteor.subscribe("events", function() {
			var client_collection = EventCollection.find();
			client_collection.forEach(function(currentEvent){
				createMarker(map.instance, currentEvent)
			});
		});
	});
});

Template.mixrEventMap.onDestroyed(function(){
	// stop subscription
});


Template.mixrEventMap.helpers({
	initPrimaryEventMapOptions: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				draggable: false,
				scrollwheel: false,
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
