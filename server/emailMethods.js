// This file contains the methods used with sending emails for things
// such as email verification, resetting password, and whatever else may come along

Meteor.methods({
  sendVerificationLink: function() {
			let userID = Meteor.userId();
			if (userID) {
					return Accounts.sendVerificationEmail(userID);
			}
	}
  // This is where the functions for forgotten passwords will go
});
