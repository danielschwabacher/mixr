import '../templates/pickLocationPage.html';


Template.pickLocationPage.onCreated(function(){
	GoogleMaps.ready('mixrPickLocationMap', function(map) {
		var latLng = Geolocation.latLng();
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latLng.lat, latLng.lng),
			map: map.instance
		});
	});
});

Template.pickLocationPage.helpers({
	initLocationSelectMap: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
