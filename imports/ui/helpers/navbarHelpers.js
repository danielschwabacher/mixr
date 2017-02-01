import '../templates/navbars.html';
import '../templates/applyEventFilterModals.html'

// Inactive (user not logged in handlers)
Template.navbarInactive.events({
});


// Active (logged in user handlers)
Template.navbarActive.events({
	'click .navbar-signout'(event) {
		Router.go('logout')
	},
	'click .sortByTagDropDown'(event){
		event.preventDefault()
		Modal.show('sortByTagsEventFilterModal')
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
