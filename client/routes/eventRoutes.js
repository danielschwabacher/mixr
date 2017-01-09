import '../../imports/ui/helpers/eventHelpers.js';
import '../../imports/ui/helpers/createEventHelpers.js';

Router.route('/events', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				Router.go('signup');
			}
		}
		else{
			this.render('mixrEventMap')
		}
	}
});


Router.route('/create', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				Router.go('signup');
			}
		}
		else{
			this.render('createEventPage')
		}
	}
});
