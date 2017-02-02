import '../templates/mixrPrimaryMap.html';
import '../../api/mapHandlers/mainMap.js';

Template.registerHelper('checkIfOnEventPage', function(){
	return Session.get('onPrimaryMap');
});

Template.mixrEventMap.onRendered(function(){
	Session.set('onPrimaryMap', true)
	GoogleMaps.ready('mixrMap', function(map) {
		var latLng = Geolocation.latLng();
		Tracker.autorun(function(){
			console.log("running... ")
			includeTags = Session.get('tagIncludes')
			if (includeTags){
				console.log("have tags")
				console.log("tags are: " + includeTags)
				var client_collection = EventCollection.find(
					{ event_tag: { $in: includeTags} },
				);
				client_collection.forEach(function(currentEvent){
					createMarker(map.instance, currentEvent)
				});
			}
			else{
				console.log("no tags")
				var client_collection = EventCollection.find()
				client_collection.forEach(function(currentEvent){
					createMarker(map.instance, currentEvent)
				});
			}
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
				draggable: false,
				scrollwheel: false,
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
