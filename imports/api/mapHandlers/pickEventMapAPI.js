import '../Event/cachedEvent.js'

placeMarker = function(location, mapInstance){
	deleteMarkers(mapInstance, markerArray)
	var marker = new google.maps.Marker({
		position: location,
		map: mapInstance
	});
	markerArray.push(marker);
}
createFullCachedEvent = function(minimumCachedEvent, eventCoords){
	coordinatesJSON = JSON.stringify(eventCoords)
	coordinatesObj = JSON.parse(coordinatesJSON)
	eName = minimumCachedEvent.eventName
	eLocation = minimumCachedEvent.eventLoc
	eDescription = minimumCachedEvent.eventDescription
	eDateTime = minimumCachedEvent.eventDateTime
	position = {
		latitude: coordinatesObj.lat,
		longitude: coordinatesObj.lng
	};
	return new FullCachedEvent(eName, eLocation, eDescription, eDateTime, position)
}


function deleteMarkers(mapInstance){
	for (var i = 0; i < markerArray.length; i++) {
		markerArray[i].setMap(null);
	}
	markerArray = []
}
