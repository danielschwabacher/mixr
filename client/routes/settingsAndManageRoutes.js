import '../../imports/ui/helpers/manageEventsHelpers.js';
import '../../imports/ui/helpers/accountSettingsHelpers2.js';

Router.route('/manage', {
	onRun: function () {
		if (Meteor.userId()){
			this.render('manageEventsPanel')
		}
		else {
			Router.go('home')
		}
	},
	onAfterAction: function(){
		if (Meteor.userId()){
			this.render('manageEventsPanel')
		}
		else {
			// console.log("DEVNOTE: FIX THIS -- YOU ARE NOT LOGGED ON")
			Router.go('home')
		}
	},
});
	


Router.route('/account', {
	onRun: function () {
		if (Meteor.userId()){
			this.render('accountSettings')
		}
		else {
			Router.go('home')
		}
	},
	onAfterAction: function(){
		if (Meteor.userId()){
			this.render('accountSettings')
		}
		else {
			Router.go('home')
		}
	},
});