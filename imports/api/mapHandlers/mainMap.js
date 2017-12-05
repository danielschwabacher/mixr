import '../../ui/helpers/notificationModalHelpers.js'
import '../../ui/helpers/mixrSampleMapHelpers.js'

Marker = function(mapInstance, content, sample){
	this.map = mapInstance
	this.eventInfo = content
	this.bubble = null
	this.id = content._id
	this.isSample = sample
}

Marker.prototype.createObjectMarker = function(){
	eventPosition = {lat: this.eventInfo.event_position.latitude, lng: this.eventInfo.event_position.longitude}

	var eventMarker = new google.maps.Marker({
		position: eventPosition,
		map: this.map,
	});
	eventMarker.set("id", this.id)

	/*
		the arrow functions are because we need to refer to the
		'this' object representing the marker (outside of the nested function).
	*/
	if (this.isSample){
		google.maps.event.addListener(eventMarker, 'click', () => {
			Modal.show('sampleEventInfoModal')
		});
	}
	else{
		google.maps.event.addListener(eventMarker, 'click', () => {
			Modal.show('eventInformationModal', this.eventInfo)
		});
	}

	google.maps.event.addListener(eventMarker, 'mouseover', () => {
		updateSideBarLinks(eventMarker.get('id'))
		// phaseMarkers(eventMarker.get('id'))
	});

	google.maps.event.addListener(eventMarker, 'mouseout', () => {
		updateSideBarLinks(null)
	});

	GLOBAL_MARKERS.push(eventMarker)
	return 0;
}

removeMarkers = function(){
	for (var i = 0; i < GLOBAL_MARKERS.length; i++) {
		GLOBAL_MARKERS[i].setMap(null);
	}
	GLOBAL_MARKERS.length = 0
	GLOBAL_MARKERS = []
}

updateSideBarLinks = function(eventId){
	Session.set('sidebarIds', eventId)
}
