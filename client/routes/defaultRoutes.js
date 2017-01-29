import '../../imports/ui/helpers/homeHelpers.js';
import '../../imports/ui/helpers/navbarHelpers.js';
import '../../imports/ui/helpers/landingPageHelpers.js';


// "global" route so the navbar appears on every page
Router.configure({
  layoutTemplate: 'navbar'
});

// default index route
Router.route('/', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				this.render('landingPage')
			}
		}
		else{
			Router.go('events')
		}
	}
});

Router.route('/home', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				this.render('landingPage')
			}
		}
		else{
			Router.go('events')
		}
	}
});
