import '../templates/eventResponseModals.html';
import '../../api/Filters/tagFilter.js'
import '../../api/Notifications/notifyWrapper.js'

// applyEventFilterModals below
import '../templates/applyEventFilterModals.html';
// var Slider = require("bootstrap-slider");

// TODO: encapsulate this in a different method
Template.sortByTagsEventFilterModal.onRendered(function() {
	var sessionTags = Session.get('tagFilterIncludes')
	if (sessionTags){
		for (item of sessionTags){
			switch (item) {
				case "sports":
					$('#sportsCheckboxFilter').prop('checked', true);
					break;
	  			case "performances":
					$('#performancesCheckboxFilter').prop('checked', true);
					break;
				case "arts":
					$('#artsCheckBoxFilter').prop('checked', true);
					break;
				case "academicInterest":
					$('#academicInterestFilter').prop('checked', true);
					break;
				case "other":
					$('#otherFilter').prop('checked', true);
					break;
			}
		}
	}
});


Template.sortByTagsEventFilterModal.events({
	'click #submitEventFilterTagSelections'(event, template){
		event.preventDefault()
		var checkedValues = $('input:checkbox:checked').map(function() {
    		return this.id;
		}).get();
		tagHandler = new TagFilter(checkedValues)
		tagHandler.populateTags()
		tagHandler.setSessionTags()
		notify("Tags updated", "success", "right")

	},
	'click #resetTagsButton'(event, template){
		event.preventDefault()
		fullTagArray = ['sports', 'performances', 'arts', 'academicInterest', 'other']
		Session.set('tagFilterIncludes', fullTagArray)
		notify("Tags reset", "success", "right")
	}
});

Template.sortByTimeEventFilterModal.onRendered(function() {
	timeUntilEvent = Session.get('timeFilterHours')
	/*
	var mySlider = $(".timeSlider").slider({
		value: timeUntilEvent,
		min: 1,
		max: 72,
		ticks: [1, 24, 48, 72],
		ticks_positions: [0, 33, 66, 100],
		ticks_labels: ["1 hour", "1 day", "2 days", "3 days"],
		formatter: function(value) {
			return value + " hours"
		},
	});
	/*	
		timeSlider = new Slider(".timeSlider", {

		});
	*/
});

Template.sortByTimeEventFilterModal.events({
	'click #submitEventFilterTimeSelections'(event, template){
		var sliderValue = $(".timeSlider").val();
		Session.set('timeFilterHours', sliderValue)
		notifyString = "Showing events within " + sliderValue + " hours."
		notify(notifyString, "success", "right")

	},
	'click #resetTimeButton'(event, template){
		Session.set('timeFilterHours', 72)
		notify("Time reset", "success", "right")
	}
});

outputUpdate = function(val) {
	document.querySelector('#timeSlider').value = val + " hours";	
}