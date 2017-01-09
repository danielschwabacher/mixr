import '../../imports/ui/helpers/eventHelpers.js';

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
