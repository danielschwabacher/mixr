import '../templates/eventResponseModals.html';
import '../../api/Filters/tagFilter.js'
// applyEventFilterModals below
import '../templates/applyEventFilterModals.html';

// TODO: encapsulate this in a different method
Template.sortByTagsEventFilterModal.onRendered(function() {
	var sessionTags = Session.get('tagIncludes')
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

Template.sortByTimeEventFilterModal.events({
	'click #submitEventFilterTimeSelections'(event, template){
		console.log("filtering times...")
	}
});
