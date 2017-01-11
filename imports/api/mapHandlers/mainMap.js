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
}
