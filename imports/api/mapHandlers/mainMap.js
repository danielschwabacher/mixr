import '../../ui/helpers/notificationModalHelpers.js'

createMarker = function(mapInstance, eventToDisplay){
	eventPosition = {lat: eventToDisplay.event_position.latitude, lng: eventToDisplay.event_position.longitude}
	eventName = eventToDisplay.event_name
	eventDescription = eventToDisplay.event_description
	// console.log(JSON.stringify(eventToDisplay))
	eventTag = eventToDisplay.event_tag
	x = eventToDisplay
	var eventMarker = new google.maps.Marker({
		position: eventPosition,
		map: mapInstance
	})
	eventMarker.addListener('click', function() {
		Modal.show('eventInformationModal', eventToDisplay)
	});
	var markerWindow = new google.maps.InfoWindow({
    	content: '<div id="iw-container">' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Event name: </div>' + eventName +
					  '<div class="iw-subTitle">Event description: </div>' + eventDescription +
					  '<div class="iw-subTitle">Tag: </div>' + eventTag +
                    '</div>' +
                  '</div>'
  	});
	eventMarker.addListener("mouseover", function() {
    	markerWindow.open(mapInstance, eventMarker);
	});
	eventMarker.addListener('mouseout', function(){
		markerWindow.close();
	});
	GLOBAL_MARKERS.push(eventMarker)
}

removeMarkers = function(mapInstance){
	for(i=0; i < GLOBAL_MARKERS.length; i++){
        GLOBAL_MARKERS[i].setMap(null);
    }
}
