import '../templates/verifyEmailPage.html';


Template.VerificationPageError.events({
    'click #verifyOverrideButton'(event, template){
        Router.go("verifyOverride");
    } 
});