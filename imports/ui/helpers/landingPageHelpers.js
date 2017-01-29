import '../templates/landingPage.html';
Template.landingPage.events({
	'click .scroll-down-button'(event) {
		event.preventDefault();
		$(document.body).animate({
    		'scrollTop': $('#whatIsMixr').offset().top
		}, 1000);
	}
});
