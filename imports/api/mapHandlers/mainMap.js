import '../../ui/helpers/notificationModalHelpers.js'
import '../InfoBubble/infobubble-compiled.js'


Marker = function(mapInstance, content){
	this.map = mapInstance
	this.eventInfo = content
	this.bubble = null
	this.id = content._id
}

Marker.prototype.createObjectMarker = function(){
	eventPosition = {lat: this.eventInfo.event_position.latitude, lng: this.eventInfo.event_position.longitude}

	var eventMarker = new google.maps.Marker({
		position: eventPosition,
		map: this.map
	});
	eventMarker.set("id", this.id)

	/*
		the arrow functions are because we need to refer to the 'this' object representing the marker (outside of the nested function).
	*/
	google.maps.event.addListener(eventMarker, 'click', () => {
		Modal.show('eventInformationModal', this.eventInfo)
	});

	/*
	google.maps.event.addListener(eventMarker, 'mouseover', () => {
		// console.log("clicked marker: " + this.eventInfo.event_name)
		this.bubble.setContent(markerInfo);
		this.bubble.open(this.map, eventMarker);
	});

	google.maps.event.addListener(eventMarker, 'mouseout', () => {
		this.bubble.close()
	});
	*/

	google.maps.event.addListener(eventMarker, 'mouseover', () => {
		updateSideBarLinks(eventMarker.get('id'))
	});

	google.maps.event.addListener(eventMarker, 'mouseout', () => {
		updateSideBarLinks(null)
	});

	GLOBAL_MARKERS.push(eventMarker)

	return 0;
}

removeMarkers = function(mapInstance){
	for(i=0; i < GLOBAL_MARKERS.length; i++){
        GLOBAL_MARKERS[i].setMap(null);
    }
}

updateSideBarLinks = function(eventId){
	Session.set('sidebarIds', eventId)
}
