import '../templates/eventResponseModals.html';
import '../../api/Filters/tagFilter.js'
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
		tagsToInclude = new TagFilter(checkedValues)
		Session.set('tagIncludes', tagsToInclude.mongoIncludes)
	}
});
