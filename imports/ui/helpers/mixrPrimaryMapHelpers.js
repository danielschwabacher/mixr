import '../templates/mixrPrimaryMap.html';
import '../templates/applyEventFilterModals.html'
import '../../api/mapHandlers/mainMap.js';
import '../../api/Time/converter.js'
import { EJSON } from 'meteor/ejson'
GLOBAL_MARKERS = []
MAP = 0
ALL_SHOWN_EVENTS = 0
ALL_SHOWN_EVENTS_SCRAPED = []

// helper function to display all events in ALL_SHOWN_EVENTS
showAllEvents = function(event_list, map_instance){
	event_list.forEach(function(currentEvent){
		temp_marker = new Marker(map_instance, currentEvent)
		temp_marker.createObjectMarker()
	});
}

Template.mixrEventMap.onCreated(function(){
	this.eventsCollection = this.subscribe('events');
});

Template.mixrEventMap.onRendered(function(){
	GoogleMaps.ready('mixrMap', function(map) {
		console.log("map is ready")
		MAP = map.instance
		var latLng = Geolocation.latLng();
        Tracker.autorun(() => {
			removeMarkers()
			includeTags = Session.get('tagFilterIncludes')
			timeFilter = Session.get('timeFilterHours')
			currentUnixTime = moment().unix()
			additionalSeconds = hoursToSeconds(timeFilter)
			unixTimeRange = currentUnixTime + additionalSeconds
			ALL_SHOWN_EVENTS = EventCollection.find(
				{
					event_tag: { $in: includeTags},
					event_timestamp: {$lte: unixTimeRange},

				}
			);

			ALL_SHOWN_EVENTS.forEach(
				function(doc) {
					if (doc.number_of_users_attending < doc.event_max_number){
						console.log("Pushing: " + doc.event_name)
						ALL_SHOWN_EVENTS_SCRAPED.push(doc)
					}
				}
			);
			showAllEvents(ALL_SHOWN_EVENTS_SCRAPED, map.instance)
        });
	});
});

Template.mixrEventMap.helpers({
	initPrimaryEventMapOptions: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				draggable: true,
				scrollwheel: true,
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 15
			};
		}
	}
});
Session.set('sidebarIds', null)
Template.eventDisplay.helpers({
	/*
		This is for the sidebar part of the map display.
		It returns an array of objects representing the events
		to display. If id is null, then no marker is hovered over,
		hence all the events are displayed.
		Only selects tags and times.
	*/
	'getEvents': function(tags, time, id){
		sidebarId = Session.get('sidebarIds')
		var eventsArray = []
		currentUnixTime = moment().unix()
		additionalSeconds = hoursToSeconds(time)
		unixTimeRange = currentUnixTime + additionalSeconds
		if (sidebarId){
			displayEvents = EventCollection.find(
				{
					_id: sidebarId,
					event_tag: { $in: tags},
					event_timestamp: {$lte: unixTimeRange}
				}
			);
		}
		else{
			displayEvents = EventCollection.find(
				{
					event_tag: { $in: tags},
					event_timestamp: {$lte: unixTimeRange}
				}
			);
		}
		displayEvents.forEach(function(currentDoc){
			if (currentDoc.number_of_users_attending < currentDoc.event_max_number){
				eventsArray.push(currentDoc)
			}
		});
		return eventsArray
    },
	'returnSessionTags': function(){
		return Session.get('tagFilterIncludes')

	},
	'returnSessionTimes': function(){
		return Session.get('timeFilterHours')
	},
	'returnSessionSidebarIds': function(){
		return Session.get('sidebarIds')
	}
});

Template.eventSection.events({
	"click #eventSectionRegisterButton"(event, template){
		if (Meteor.user() && Meteor.user().emails[0].verified){
			Meteor.call("registerEvent", this, function(err, didRegister){
				if (didRegister == 1){
					notify("Registered successfully!", "success", "right")
				}
				else if (didRegister == 0){
					notify("Error: You are already registered for this event", "danger", "center")
				}
				else if (didRegister == -1){
					notify("Error: event is full", "danger", "center")
				}
				else{
					notify("Unknown error, please try again later.", "danger", "center")
				}
			});
		}
		else {
			Modal.show("emailNotVerifiedModal")
		}
	},
	"click #eventSectionMoreInfoButton"(event, template){
		Modal.show('eventInformationModal', this)
	},
	"mouseenter .event-section-clickable-area"(event, template) {
		removeMarkers()
		singleMarker = EventCollection.find(
			{
				_id: this._id
			}
		);
		singleMarker.forEach(function(currentEvent){
			temp_marker = new Marker(MAP, currentEvent)
			temp_marker.createObjectMarker()
		});
	},
	"mouseleave .event-section-clickable-area"(event,template){
		showAllEvents(ALL_SHOWN_EVENTS_SCRAPED, MAP)
	},
});

Template.applyEventFiltersSection.events({
	"click .sortByTagDropDown"(event){
		event.preventDefault()
		Modal.show('sortByTagsEventFilterModal')
	},
	"click .sortByTimeDropDown"(event){
		event.preventDefault()
		Modal.show('sortByTimeEventFilterModal')
	}
});
