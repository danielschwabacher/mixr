import '../templates/eventResponseModals.html';
import '../../api/Filters/tagFilter.js'
// applyEventFilterModals below
import '../templates/applyEventFilterModals.html';

Template.sortByTagsEventFilterModal.events({
	'click #submitEventFilterTagSelections'(event, template){
		event.preventDefault()
		var checkedValues = $('input:checkbox:checked').map(function() {
    		return this.id;
		}).get();
		tagHandler = new TagFilter(checkedValues)
		tagHandler.insertMongoTags()
	}
});

Template.sortByTimeEventFilterModal.events({
	'click #submitEventFilterTimeSelections'(event, template){
		console.log("filtering times...")
	}
});
