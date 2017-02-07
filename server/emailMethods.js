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
    this.unblock();

    let currentUser = Meteor.user();

    var userEmail = currentUser.emails[0].address;
    var emailText = "'" + eventTitle + "' is now live on Mixr!"
    var emailSubject = "New event created on Mixr"

    if (currentUser && userEmail) {
      Email.send({
        to: userEmail,
        from: "Mixr Dev Team <mixrdev123456@gmail.com>",
        subject: emailSubject,
        text: emailText
      });
    }
  },

  // Sends the user an email when they register for an event with event details
  sendRegisteredForEventEmail: function(currentEvent) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    let currentUser = Meteor.user()

    var userEmail = currentUser.emails[0].address

    var emailSubject = "You've registered for '" + currentEvent.event_name + "' on Mixr!"
    var eventDescription = "Event Description: " + currentEvent.event_description
    var eventLocation = "Event Location: " + currentEvent.event_location
    var eventDate = "Event Date: " + currentEvent.event_dateTime
    var emailText = "Here are the details of the event you registered for!\n" + eventDescription + "\n" + eventLocation + "\n" + eventDate

    if (currentUser && userEmail){
      Email.send({
        to: userEmail,
        from: "Mixr Dev Team <mixrdev123456@gmail.com>",
        subject: emailSubject,
        text: emailText
      });
    }

  }
});
