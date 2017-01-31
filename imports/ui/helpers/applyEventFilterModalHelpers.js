import '../templates/applyEventFilterModals.html';

Template.sortByTagsEventFilterModal.onCreated(function() {
	console.log("created event tag modal")
});

Template.sortByTagsEventFilterModal.events({
	'click .submitEventFilterTagSelections'(event, template){
		event.preventDefault()
		console.log("clicked tag confirmation")
		var eventSelectedTag = $("input[type='checkbox']:checked");
		var literalEventTag = eventSelectedTag.attr('id');
		console.log("checked is: " + literalEventTag)
	}
});
