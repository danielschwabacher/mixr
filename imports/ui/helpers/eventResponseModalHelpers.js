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
	// this is the actual slider
	document.querySelector('.timeSlider').value = timeUntilEvent;
	// this is for the label
	document.querySelector('#timeSlider').value = timeUntilEvent + " hours";
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