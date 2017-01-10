import '../../imports/ui/helpers/eventHelpers.js';
import '../../imports/ui/helpers/createEventHelpers.js';
import '../../imports/ui/helpers/pickLocationHelpers.js';

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
				alert("You need to create an event first.")
				Router.go('create')
			}
		}
	}
});
