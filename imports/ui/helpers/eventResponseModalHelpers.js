import '../templates/eventResponseModals.html';
// applyEventFilterModals below
import '../templates/applyEventFilterModals.html';

Template.sortByTagsEventFilterModal.onCreated(function() {
});

Template.sortByTagsEventFilterModal.events({
	'click #submitEventFilterTagSelections'(event, template){
		event.preventDefault()
		var checkedValues = $('input:checkbox:checked').map(function() {
    		return this.id;
		}).get();
		console.log("checked is: " + checkedValues)
		console.log("reload map with filters applied")
	}
});
