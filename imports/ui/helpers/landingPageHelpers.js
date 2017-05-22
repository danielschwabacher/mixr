import '../templates/landingPage.html';
import '../templates/legalModals.html';
Template.landingPage.events({
	'click .scroll-down-button'(event) {
		event.preventDefault();
		$(document.body).animate({
    		'scrollTop': $('#whatIsMixr').offset().top
		}, 1000);
	},
	'click #signupBannerButton'(event){
		Router.go('signup');
	},
	'click #privacyModalLink'(event){
		Modal.show('privacyModal')
	},
	'click #simplePrivacyModalLink'(event){
		Modal.show('simplePrivacyModal')
	},
	'click #termsModalLink'(event){
		Modal.show('termsModal')
	},
	'click #disclaimerModalLink'(event){
		Modal.show('disclaimerModal')
	}
});
