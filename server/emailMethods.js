// This file contains the methods used with sending emails for things
// such as email verification, resetting password, and whatever else may come along

Meteor.methods({

  // Sends the user an email verification link
  sendVerificationLink: function() {
	let userID = Meteor.userId();
	if (userID) {
			return Accounts.sendVerificationEmail(userID);
	}
  },

  // Sends the user a password reset email
  sendForgotPassword: function(userEmail) {
      let userID = Accounts.findUserByEmail(userEmail)
      if (userID) {
          console.log("userID was valid");
          return Accounts.sendResetPasswordEmail(userID);
      } else {
          alert();
          console.log("The userID was NOT valid");
      }
  },

  // Sends the user an email when they create an event
  sendCreatedEventEmail: function(eventTitle) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    // this.unblock();
    var currentUser = Meteor.user();
    var emailPreference = currentUser.profile.custom_email_preferences.create_event

    if (emailPreference) {
      var userEmail = currentUser.emails[0].address;
      var emailText = "'" + eventTitle + "' is now live on Mixr!"
      var emailSubject = "New event created on Mixr"
      var link = Meteor.absoluteUrl() + "account"

      var emailData = {
        eventTitle: eventTitle,
        message: emailText,
        unsubscribeLink: link
      };

      SSR.compileTemplate('createEventEmail', Assets.getText('createEventEmail.html'));
      Meteor.defer(function(){
        if (currentUser && userEmail) {
          Email.send({
            to: userEmail,
            from: "Mixr Dev Team <notifications@mixrbeta.com>",
            subject: emailSubject,
            html: SSR.render('createEventEmail', emailData)
          });
        }
      });
    }
  },

  // Sends the user an email when they register for an event with event details
  sendRegisteredForEventEmail: function(currentEvent) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    // this.defer();

    var currentUser = Meteor.user()
    var emailPreference = currentUser.profile.custom_email_preferences.register_event

    if (emailPreference) {
      var userEmail = currentUser.emails[0].address
      var link = Meteor.absoluteUrl() + "account"
      var emailSubject = "You've registered for '" + currentEvent.event_name + "' on Mixr!"
      var eventDescription = "Event Description: " + currentEvent.event_description
      var eventLocation = "Event Location: " + currentEvent.event_location
      var eventDate = "Event Date: " + currentEvent.event_dateTime
      var emailText = "Here are the details of the event you registered for!\n" + eventDescription + "\n" + eventLocation + "\n" + eventDate

      var emailData = {
        message: emailText,
        unsubscribeLink: link
      }

      SSR.compileTemplate('registerForEvent', Assets.getText('registerForEvent.html'))
      Meteor.defer(function(){
        if (currentUser && userEmail){
          Email.send({
            to: userEmail,
            from: "Mixr Dev Team <notifications@mixrbeta.com>",
            subject: emailSubject,
            html: SSR.render('registerForEvent', emailData)
          });
        }
        console.log("email sent!")
      });
    }
  },

  // Sends the user an email when an event they're registered for is deleted
  sendEventDeletedEmail: function(eventID) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    // this.unblock();  // Especially important here since the DB is being queried so much
    var delEvent = EventCollection.findOne(
      {
        _id: eventID
      }
    )
    var eName = delEvent.event_name
    var eLocation = delEvent.event_location
    var eDate = delEvent.event_dateTime
    // Find every user registered to this event and notify them it was deleted
    var registeredUsers = UserEventsCrossReferenceCollection.find(
      {
        'registered_events.eventId': eventID
      }
    )
    // Send email to every user that was registered for the event
    registeredUsers.forEach(function(doc) {
      let currUserID = doc.user
      let currUser = Meteor.users.findOne(
        {
          _id: currUserID
        }
      )
      let currEmail = currUser.emails[0].address
      var emailPreference = currUser.profile.custom_email_preferences.event_deleted

      if (emailPreference) {
        var emailText = "The event " + eName + " scheduled for " + eDate + " at " + eLocation + " has been deleted."
        var emailData = {
          message: emailText
        }

        SSR.compileTemplate('eventDeletedEmail', Assets.getText('eventDeletedEmail.html'))
        Meteor.defer(function(){
          if (currUser && currEmail){
            Email.send({
              to: currEmail,
              from: "Mixr Dev Team <notifications@mixrbeta.com>",
              subject: "An event you registered for has been removed!",
              html: SSR.render('eventDeletedEmail', emailData)
            });
          }
        });
      }
    });
  },

  sendUserFeedback: function(feedback) {
    // this.unblock()
    var currUser = Meteor.user()
    var userEmail = Meteor.user().emails[0].address
    var returnSubject = "We received your feedback!"
    var returnText = "Thank you for your interest in Mixr!  We have received your feedback and will do our best to address your concerns. \n\nSincerely,\nThe Mixr Dev Team"

    var sendAddress = "mixrdev123456@gmail.com"
    var emailSubject = "User Feedback"
    var emailText = "User " + userEmail + " has sent the following feedback:\n\n" + feedback

    if (currUser && userEmail){
      Meteor.defer(function(){
        Email.send({
          to: sendAddress,
          from: "Mixr Dev Team <notifications@mixrbeta.com>",
          subject: emailSubject,
          text: emailText
        });
      });
      Meteor.defer(function(){
        Email.send({
          to: userEmail,
          from: "Mixr Dev Team <notifications@mixrbeta.com>",
          subject: returnSubject,
          text: returnText
        });
      });
    }
    return
  },

  updateUserEmailPreferences: function(userPrefs) {
    // userPrefs has 3 boolean fields defined as
    // 		var userPrefs = {
    //			createEPref: createEventPref,
    //			registerEPref: registerEventPref,
    //			deletedEPref: deletedEventPref
    //		}
    var userID = Meteor.userId()
    var createEventPref = Number(userPrefs.createEPref)
    var registerEventPref = Number(userPrefs.registerEPref)
    var deletedEventPref = Number(userPrefs.deletedEPref)

    Meteor.users.update(
      {_id: userID},
      {$set: { 'profile.custom_email_preferences': {
        create_event: createEventPref,
        register_event: registerEventPref,
        event_deleted: deletedEventPref
      }}}
    );
  },

  grabEmailPref: function() {
    // Returns an array of the users current email preferences
    var currentUser = Meteor.user()
    var createEpref = Meteor.user().profile.custom_email_preferences.create_event
    var registerEpref = Meteor.user().profile.custom_email_preferences.register_event
    var deleteEpref = Meteor.user().profile.custom_email_preferences.event_deleted

    var pref = [createEpref, registerEpref, deleteEpref]
    return pref
  }


});
