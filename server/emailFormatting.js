/* General Email Formatting */
Accounts.emailTemplates.siteName = "Mixr";
Accounts.emailTemplates.from = "Mixr Dev Team <notifications@mixrbeta.com>";

/* Forgot password formatting */
SSR.compileTemplate('passwordReset', Assets.getText('forgotPasswordEmailTemplate.html'));

Accounts.emailTemplates.resetPassword.subject = function(user) {
  return "Reset Password"
};

Accounts.emailTemplates.resetPassword.from = function() {
  return "Mixr Dev Team <notifications@mixrbeta.com>"
};

Accounts.emailTemplates.resetPassword.html = function(user, url) {
  var emailData
  return SSR.render('passwordReset', emailData) + url
}

/* Verification email formatting */
Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return "Verify your Mixr account"
};

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return "Thank you for signing up for the Mixr beta! Please click the following link to verify your email \n" + url
};

Accounts.emailTemplates.verifyEmail.from = function() {
  return "Mixr Dev Team <notifications@mixrbeta.com>"
};
