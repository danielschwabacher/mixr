import '../../imports/ui/helpers/homeHelpers.js';
import '../../imports/ui/helpers/navbarHelpers.js';
import '../../imports/ui/helpers/landingPageHelpers.js';
import '../../imports/ui/helpers/unsubscribeFromEmailsHelpers.js';


// "global" route so the navbar appears on every page
Router.configure({
  layoutTemplate: 'navbar'
});

// default index route
Router.route('/', function(){
	this.render('landingPage')
})

Router.route('/home', function(){
	this.render('landingPage')
})

// unsubscribe from emails page
Router.route('/unsubscribe', function(){
  this.render('unsubscribeFromEmails')
})
