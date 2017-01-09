import '../../imports/ui/helpers/homeHelpers.js';
import '../../imports/ui/helpers/navbarHelpers.js';

// "global" route so the navbar appears on every page
Router.configure({
  layoutTemplate: 'navbar'
});

// default index route
Router.route('/', function(){
	this.render('homeCover')
});

Router.route('/home', function(){
	this.render('homeCover')
});
