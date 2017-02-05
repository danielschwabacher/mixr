import '../../ui/helpers/notificationModalHelpers.js'

createMarker = function(mapInstance, eventToDisplay){
	eventPosition = {lat: eventToDisplay.event_position.latitude, lng: eventToDisplay.event_position.longitude}
	var eventMarker = new google.maps.Marker({
		position: eventPosition,
		map: mapInstance
	})
	eventMarker.addListener('click', function() {
		Modal.show('eventInformationModal', eventToDisplay)
	});
	GLOBAL_MARKERS.push(eventMarker)
}

removeMarkers = function(mapInstance){
	for(i=0; i < GLOBAL_MARKERS.length; i++){
        GLOBAL_MARKERS[i].setMap(null);
    }
}
