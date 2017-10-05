import '../templates/geolocationError.html';
import '../templates/legalModals.html';



Template.geolocationErrorPage.events({
    'click #tellUsLink'(event, template){
        Modal.show('inquiriesModal')
    }
});