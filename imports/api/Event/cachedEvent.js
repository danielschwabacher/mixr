//TODO: make this OO and incorporate inheritance from event
CachedEvent = function(eName, eLoc, eDesc, eDateTime, eTimeStamp, eType, eMaxRegistered){
	this.eventName = eName
	this.eventLoc = eLoc
	this.eventDescription = eDesc
	this.eventDateTime = eDateTime
	this.eventTimeStamp = eTimeStamp
	this.eventTagType = eType
	this.eventMaxRegistered = eMaxRegistered
}

FullCachedEvent = function(eName, eLoc, eDesc, eDateTime, eTimeStamp, eType, eMaxRegistered, eCoords){
	this.eventName = eName
	this.eventLoc = eLoc
	this.eventDescription = eDesc
	this.eventDateTime = eDateTime
	this.eventTimeStamp = eTimeStamp
	this.eventTagType = eType
	this.eventMaxRegistered = eMaxRegistered
	this.coordinates = eCoords
}

CachedEvent.prototype.createReference = function(){
	Session.set('hasCachedEvent', true)
	Session.set('clientMinimumCachedEvent', clientTempCachedEvent)
}

CachedEvent.prototype.removeReference = function(){
	Session.set('hasCachedEvent', false)
	Session.set('clientMinimumCachedEvent', null)
}

FullCachedEvent.prototype.createReference = function(){
	Session.set('hasCachedEvent', true)
	Session.set('clientMinimumCachedEvent', clientTempCachedEvent)
}

FullCachedEvent.prototype.removeReference = function(){
	Session.set('hasCachedEvent', false)
	Session.set('clientMinimumCachedEvent', null)
}
