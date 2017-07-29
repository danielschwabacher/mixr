import '../../imports/ui/helpers/geolocationErrorHelpers.js';
import '../../imports/ui/helpers/mixrPrimaryMapHelpers.js';
import '../../imports/ui/helpers/createEventHelpers.js';
import '../../imports/ui/helpers/pickLocationHelpers.js';
import '../../imports/ui/templates/createEvent.html';

Router.route('/events', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				Router.go('signup');
			}
		}
		else{
			this.render('mixrEventMap');
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



Router.route('/error', {
	onBeforeAction: function () {
		this.render('geolocationErrorPage')
	}
});

Router.route('/pickLocation', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				Router.go('signup');
			}
		}
		else {
			if (Session.get('hasCachedEvent')){
				this.render('pickLocationPage')
			}
			else{
				//ALERT
				Router.go('create')
			}
		}
	}
});
