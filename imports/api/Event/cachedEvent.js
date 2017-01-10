CachedEvent = function(eName, eLoc, eDesc, eDateTime){
	this.eventName = eName
	this.eventLoc = eLoc
	this.eventDescription = eDesc
	this.eventDateTime = eDateTime
}

FullCachedEvent = function(eName, eLoc, eDesc, eDateTime, eCoords){
	this.eventName = eName
	this.eventLoc = eLoc
	this.eventDescription = eDesc
	this.eventDateTime = eDateTime
	this.coordinates = eCoords
}
