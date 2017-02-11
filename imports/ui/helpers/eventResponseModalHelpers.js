import '../templates/eventResponseModals.html';
import '../../api/Filters/tagFilter.js'
// applyEventFilterModals below
import '../templates/applyEventFilterModals.html';
// import rangeslider-js from 'rangeslider-js';
// var rangesliderJs = require('rangeslider-js')
var Slider = require("bootstrap-slider");

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
	}
});

Template.sortByTimeEventFilterModal.onRendered(function() {
	timeUntilEvent = Session.get('timeFilterHours')
	timeSlider = new Slider(".timeSlider", {
		value: timeUntilEvent,
		min: 1,
		max: 72,
		ticks: [1, 24, 48, 72],
		ticks_labels: ["1 hour", "1 day", "2 days", "3 days"],
		tooltip_position: 'top',
		formatter: function(value) {
			return value + " hours"
		},
	});

});

Template.sortByTimeEventFilterModal.events({
	'click #submitEventFilterTimeSelections'(event, template){
		Session.set('timeFilterHours', timeSlider.getValue())
		console.log("time until event: " + Session.get('timeFilterHours'))
	}
});
