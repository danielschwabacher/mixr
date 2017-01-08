import '../imports/ui/helpers/homeHelpers.js';
import '../imports/ui/helpers/navbarHelpers.js';
import '../imports/ui/helpers/signup.js';

Router.configure({
  layoutTemplate: 'navbar'
});

Router.route('/home', function(){
	this.render('homeCover')
});

Router.route('/', function(){
	this.render('homeCover')
});

Router.route('/signup', function(){
	this.render('signupPage')
});
