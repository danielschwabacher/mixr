import '../../ui/helpers/notificationModalHelpers.js'
import '../InfoBubble/infobubble-compiled.js'


Marker = function(mapInstance, content){
	this.map = mapInstance
	this.eventInfo = content
}
Marker.prototype.getName = function(){
	return this.eventInfo.event_name;
}
Marker.prototype.createObjectMarker = function(){
	// console.log("creating marker: " + JSON.stringify(this.eventInfo))
	eventPosition = {lat: this.eventInfo.event_position.latitude, lng: this.eventInfo.event_position.longitude}
	eventName = this.eventInfo.event_name
	eventDescription = this.eventInfo.event_description
	eventTag = this.eventInfo.event_tag


	var eventMarker = new google.maps.Marker({
		position: eventPosition,
		map: this.map
	});

	markerInfo = '<div id="iw-container">' + '<div class="iw-content">' + '<div class="iw-subTitle">Event name: </div>' + eventName +'<div class="iw-subTitle">Event description: </div>' + eventDescription +'<div class="iw-subTitle">Tag: </div>' + eventTag + '</div>' + '</div>'

	eventDisplayBubble = new InfoBubble({
		content: markerInfo,
		backgroundColor: 'black',
		borderRadius: 4,
		arrowSize: 10,
		maxWidth: 300,
		disableAutoPan: true
	});

	google.maps.event.addListener(eventMarker, 'click', function() {
		console.log("clicked marker: " + this.eventInfo.event_name)
		eventDisplayBubble.setContent(markerInfo);
		eventDisplayBubble.open(this.map, eventMarker);
	});

	GLOBAL_MARKERS.push(eventMarker)

	return 0;
}

removeMarkers = function(mapInstance){
	for(i=0; i < GLOBAL_MARKERS.length; i++){
        GLOBAL_MARKERS[i].setMap(null);
    }
}
