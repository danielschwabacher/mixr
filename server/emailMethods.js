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
  }
});
