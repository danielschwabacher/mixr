/* General formatting */
Accounts.emailTemplates.siteName = "Mixr";
Accounts.emailTemplates.from = "Mixr Dev Team <mixrdev123456@gmail.com>";

/* Forgot password formatting 
SSR.compileTemplate('passwordReset', Assets.getText('forgotPassword.html'));

Accounts.emailTemplates.resetPassword.subject = function(user) {
  return "Reset Password"
};

Accounts.emailTemplates.resetPassword.text = function(user, url) {
  return "Click the following link to reset your password! \n" + url
};

Accounts.emailTemplates.resetPassword.from = function() {
  return "Mixr Dev Team <mixrdev123456@gmail.com>"
};

Accounts.emailTemplates.resetPassword.html = function(user, url) {
  var variables_we_want_to_fill_from_template;
  return SSR.render('passwordReset', variables_we_want_to_fill_from_template) + url
};
*/

/* Verification email formatting */
Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return "Verify your Mixr account"
};

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return "Thank you for signing up for the Mixr beta! Please click the following link to verify your email \n" + url
};

Accounts.emailTemplates.verifyEmail.from = function() {
  return "Mixr Dev Team <mixrdev123456@gmail.com>"
};
