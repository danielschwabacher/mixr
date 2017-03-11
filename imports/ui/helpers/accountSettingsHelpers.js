import '../templates/accountSettingsPage.html'
import '../templates/feedBackModal.html'
import './changePasswordModalHelpers.js'

Template.accountSettingsPage.events({
	'click #changePasswordLink'(event, template){
		Modal.show("changePasswordModal")
	},
	'click #giveFeedbackLink'(event, template){
		Modal.show("feedbackModalDisplay")
	},
	'click #emailSettingsLink'(event, template){
		Modal.show("emailPreferencesModal")
	}
});

Template.feedbackModalDisplay.events({
	'submit .sendFeedbackModalForm'(event, template) {
		event.preventDefault()
		console.log("send feedback clicked.")

		var userFeedback = event.target.feedbackArea.value
		Meteor.call('sendUserFeedback', userFeedback, (error, response) => {
			if (error) {
				console.log("There was an error: " + response)
			}
		});
		Modal.hide("feedbackModalDisplay")
		Router.go('home')
	}
});


Template.emailPreferencesModal.events({
	'submit .updateEmailPrefModalForm'(event, template) {
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
			if (error) {
				console.log("There was an error: " + response)
			}
		});

		Modal.hide("emailPreferencesModal")
		Router.go("home")
	}
});
