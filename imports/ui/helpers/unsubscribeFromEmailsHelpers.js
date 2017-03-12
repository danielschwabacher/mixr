import '../templates/unsubscribeFromEmails.html';

Template.unsubscribeFromEmails.events({
  'click #cancelUnsubscribe'(event, template) {
    Router.go('home')
  },

  'click #confirmUnsubscribe'(event, template) {
    // Need to now find the user and change their email preferences off
    event.preventDefault()
    Meteor.call('changeSubscriptionPreference', (error, response) => {
      if (error) {
        console.log("There was an error: " + response)
      }
    });
    Router.go('home')
  }
});
