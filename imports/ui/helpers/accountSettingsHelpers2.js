import '../templates/accountSettingsPage.html'
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
	'submit .changePasswordForm'(event, template) {
		event.preventDefault()
		var oldPassword = event.target.currentPasswordChangePasswordModal.value;
		var newPassword1 = event.target.newPassword1.value;
		var newPassword2 = event.target.newPassword2.value;
		if (newPassword1 == newPassword2){
			Accounts.changePassword(oldPassword, newPassword1, function(err){
				if (err){
					notify("Your password is incorrect", "danger", "center")
				}
				else{
					Modal.hide()
					notify("Password changed successfully!", "success", "right")
				}
			});
		}
		else{
			notify("Passwords do not match", "danger", "center")
		}
	},
	'submit .updateEmailPreferencesForm'(event, template) {
		event.preventDefault()
		console.log("updated email prefs submitted")
		var createEventPref = $('#createdEventPref').is(':checked')
		var registerEventPref = $('#registeredEventPref').is(':checked')
		var deletedEventPref = $('#eventDeletedPref').is(':checked')
		var userPrefs = {
			createEPref: createEventPref,
			registerEPref: registerEventPref,
			deletedEPref: deletedEventPref
		}
		Meteor.call('updateUserEmailPreferences', userPrefs, (error, response) => {
			if (error) {s
				console.log("There was an error: " + response)
			}
		});

		Modal.hide("emailPreferencesModal")
		Router.go("home")
	},
	'submit .sendFeedbackForm'(event, template) {
		event.preventDefault()
		console.log("send feedback clicked.")
		var userFeedback = event.target.feedbackArea.value
		Meteor.call('sendUserFeedback', userFeedback, (error, response) => {
			if (error) {
				notify("We couldn't send your feedback right now.", "danger", "center")
				console.log("There was an error: " + response)
			}
			notify("Your feedback has been sent, thanks!", "success", "right")
		});
		Router.go('home')
	}
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



Template.EmailSettingsPane.helpers({
  // Calls a server-side function that returns an array containing
  // the users current email preferences and updates HTML page to reflect them
  currentPreferences: function() {
    Meteor.call('grabEmailPref', (error, result) => {
      if (error) {
        notify("There was an error checking the create event email preference.", "danger", "center")
        console.log("Error checking email preference: " + error)
      }
      // Due to asynchronous server calls, need to have the outcome as a callback
      if (result[0]) {
        $('#createdEventPref').attr('checked', true)
      }
      if (result[1]) {
        $('#registeredEventPref').attr('checked', true)
      }
      if (result[2]) {
        $('#eventDeletedPref').attr('checked', true)
      }
    });
  }

});
