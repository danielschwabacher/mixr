import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../templates/navbars.html';


// Inactive (user not logged in handlers)
Template.navbarInactive.events({
});




// Active (logged in user handlers)
Template.navbarActive.events({
	'click .navbar-signout'(event) {
		Meteor.logout(function(err){
			if (err){
				console.log("could not sign out user, error: " + err)
			}
		});
	}
});

Template.navbarActive.helpers({
	firstName: function() {
		return Meteor.user().profile.first_name;
	},
	lastName: function() {
		return Meteor.user().profile.last_name;
	}
});
