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
	var self = this
	Meteor.subscribe("events", function() {
		self.autorun(function() {
			 var client_collection = EventCollection.findOne();
			 console.log("data source changed.")
			 console.log("collection: " + JSON.stringify(client_collection))
		});
	});
	//handle = Meteor.subscribe('events');
	//console.log(handle)
	//console.log("EventCollection: on client: " + EventCollection.findOne())
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
