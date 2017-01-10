import '../templates/pickLocationPage.html';


Template.pickLocationPage.onCreated(function(){
	GoogleMaps.ready('mixrPickLocationMap', function(map) {
		var latLng = Geolocation.latLng();
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latLng.lat, latLng.lng),
			map: map.instance
		});
		console.log("defined: "+ GoogleMaps.maps.mixrPickLocationMap.instance)
		GoogleMaps.maps.mixrPickLocationMap.instance.addListener('click', function(event) {
			console.log("map clicked")
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
