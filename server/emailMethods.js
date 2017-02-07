// This file contains the methods used with sending emails for things
// such as email verification, resetting password, and whatever else may come along

Meteor.methods({

  // Sends the user a verification email for their account when registered
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
  sendCreatedEventEmail: function() {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    let currentUser = Meteor.user();
    var userEmail = currentUser.emails[0].address;

    if (currentUser && userEmail) {
      Email.send({
        to: userEmail,
        from: "mixrdev123456@gmail.com",
        subject: "Your latest event on Mixr!",
        text: "Congratulations! Your event is now live on Mixr.",
      });
    }
  }
});
