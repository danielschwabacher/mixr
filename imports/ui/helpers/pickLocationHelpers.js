import '../templates/pickLocationPage.html';
import './notificationModalHelpers.js';
import '../../api/mapHandlers/pickEventMapAPI.js'
import '../../api/Notifications/notifyWrapper.js'

Template.pickLocationPage.onCreated(function(){
	markerArray = []
	var BOULDER_BOUNDS = new google.maps.LatLngBounds(
		// Southwest bound
 		new google.maps.LatLng(39.964069, -105.301758),
		// Northeast bound
 		new google.maps.LatLng(40.094551, -105.178197)
	);
	GoogleMaps.ready('mixrPickLocationMap', function(map) {
		var latLng = Geolocation.latLng();
		GoogleMaps.maps.mixrPickLocationMap.instance.addListener('click', function(marker) {
			if (BOULDER_BOUNDS.contains(marker.latLng)){
				placeMarker(marker.latLng, map.instance);
				fullEventToConfirm = createFullCachedEvent(Session.get('clientMinimumCachedEvent'), marker.latLng)
				Modal.show('confirmEventModal')
			}
			else{
				notify("Please pick an area within Boulder county.", "danger", "center")
			}
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
			// console.log("loaded pickLocation map")
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
