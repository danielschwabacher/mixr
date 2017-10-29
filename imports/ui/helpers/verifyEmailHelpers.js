import '../templates/verifyEmailPage.html';
//TODO: Implement email verification

Template.VerificationPage.onRendered(function(){
});


Template.VerificationPageError.events({
    'click #verifyOverrideButton'(event, template){
        Router.go("verifyOverride");
    } 
});