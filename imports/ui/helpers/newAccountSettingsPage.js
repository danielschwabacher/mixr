import '../templates/newAccountSettingsPage.html'
Template.accountSettings.events({
 	'click #authPaneLink'(event, template){
		Session.set("settingsPagePaneSelection", "auth")
	},
	'click #emailPaneLink'(event, template){
		Session.set("settingsPagePaneSelection", "email")
	},
	'click #feedbackPaneLink'(event, template){
		Session.set("settingsPagePaneSelection", "feedback")
	},
});

Template.accountSettings.onRendered(function() {
	Session.set("settingsPagePaneSelection", "auth")
});

Template.registerHelper('getCurrentPane', function(){
	if (Session.get("settingsPagePaneSelection") == "auth"){
		return "AuthenticationPane"
	}
	else if (Session.get("settingsPagePaneSelection") == "email"){
		return "EmailSettingsPane"
	}
	else if (Session.get("settingsPagePaneSelection") == "feedback"){
		return "FeedbackPane"
	}
	else {
		return "AuthenticationPane"
	}
});
