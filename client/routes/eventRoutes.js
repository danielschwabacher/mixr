import '../../imports/ui/helpers/eventHelpers.js';

Router.route('/events', {
	onBeforeAction: function () {
		if (!Meteor.user()) {
			if (!Meteor.loggingIn()){
				this.render('signupPage');
			}
		}
		else{
			this.render('mixrEventMap')
		}
	}
});
