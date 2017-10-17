import '../templates/geolocationError.html';
import '../templates/legalModals.html';
import '../templates/locationServicesErrorPage.html';


Template.geolocationErrorPage.events({
    'click #tellUsLink'(event, template){
        Modal.show('inquiriesModal')
    }
});

Template.locationServicesError.events({
    'click #redirectToEventsPage'(event, template){
        Router.go("events");
    },
    'click #showPrivacyPolicy'(event, template){
        console.log("click p")
        Modal.show('privacyModal');
    }
});