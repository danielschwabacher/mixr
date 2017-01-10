import '../templates/mixrPrimaryMap.html';
import '../../api/mapHandlers/initMap.js'

Template.mixrEventMap.onCreated(function(){
	GoogleMaps.ready('mixrMap', function(map) {
		var latLng = Geolocation.latLng();
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latLng.lat, latLng.lng),
			map: map.instance
		});
	});
	Meteor.subscribe('events');

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
