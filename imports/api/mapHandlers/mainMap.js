import '../../ui/helpers/notificationModalHelpers.js'

createMarker = function(mapInstance, eventToDisplay){
	console.log("event: " + JSON.stringify(eventToDisplay))
	eventPosition = {lat: eventToDisplay.event_position.latitude, lng: eventToDisplay.event_position.longitude}
	var eventMarker = new google.maps.Marker({
		position: eventPosition,
		map: mapInstance
	})
	eventMarker.addListener('click', function() {
		Modal.show('eventInformationModal', eventToDisplay)
		console.log("marker clicked.")
	});
}



















/*
function createDialog(eventToDisplay){
	content = ""
    content += "<div class='iw-container'><p>Event name: " + eventToDisplay.event_name + "</p>"
    content += "<p>Event location: " + eventToDisplay.event_location + "</p>"
    content += "<p>Event description: " + eventToDisplay.event_description +"</p>"
    content += "<p>Event time: " + eventToDisplays.event_dateTime +"</p>"
    content += "<button class='btn-marker'>I'm attending!</button></div>"
    return content
}
*/
