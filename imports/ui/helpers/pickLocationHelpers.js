import '../templates/pickLocationPage.html';
import './notificationModalHelpers.js';
import '../../api/mapHandlers/pickEventMapAPI.js'

Template.pickLocationPage.onCreated(function(){
	markerArray = []
	GoogleMaps.ready('mixrPickLocationMap', function(map) {
		var latLng = Geolocation.latLng();
		GoogleMaps.maps.mixrPickLocationMap.instance.addListener('click', function(marker) {
			placeMarker(marker.latLng, map.instance);
			fullEventToConfirm = createFullCachedEvent(Session.get('clientMinimumCachedEvent'), marker.latLng)
			Modal.show('confirmEventModal')
		});
	});
});

Template.pickLocationPage.helpers({
	initLocationSelectMap: function() {
		var latLng = Geolocation.latLng(
			{timeout: 10000}
		);
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			console.log("loaded pickLocation map")
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
