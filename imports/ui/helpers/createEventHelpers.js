import '../templates/createEvent.html';
import '../../api/Event/cachedEvent.js';
import '../../api/Notifications/notifyWrapper.js'

Template.createEventPage.onRendered(function() {
	todayDate = new Date()
    $('.datetimepicker').datetimepicker({
		defaultDate: todayDate,
		minDate: todayDate,
		maxDate: new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + 10)),
		allowInputToggle: true,
		stepping: 1,
		format: "ddd, MMM Do, h:mmA",
    });

	$('.btn-minus').on('click', function(){
		currentNumber = parseInt($(this).parent().siblings('input').val())
		$(this).parent().siblings('input').val(currentNumber - 1)
	});

	$('.btn-plus').on('click', function(){
		currentNumber = parseInt($(this).parent().siblings('input').val())
		$(this).parent().siblings('input').val(currentNumber + 1)
	});
});

Template.createEventPage.events({
	'submit #createEventForm'(event, template) {
		event.preventDefault()
		var eventName = event.target.eventName.value;
		var eventLocation = event.target.eventLocation.value;
		var eventDescription = event.target.eventDescription.value;
		var eventDateTime = event.target.eventDateTime.value;
		var eventTimeStamp = moment(eventDateTime, "ddd, MMM Do, h:mmA").unix()
		var eventSelectedTag = $("input[type='radio']:checked");
		var literalEventTag = eventSelectedTag.attr('id');
		var eventTagShortened = "null"
		var eventMaxRegistered = event.target.maxRegistered.value;

		if (literalEventTag == "sportsRadioButton"){
			eventTagShortened = "sports"
		}
		else if (literalEventTag == "performancesRadioButton"){
			eventTagShortened = "performances"
		}
		else if (literalEventTag == "artsRadioButton"){
			eventTagShortened = "arts"
		}
		else if (literalEventTag == "academicInterestRadioButton"){
		eventTagShortened = "academicInterest"
		}
		else if (literalEventTag == "otherRadioButton"){
			eventTagShortened = "other"
		}
		else{
			eventTagShortened = "Could not find tag"
		}

		clientTempCachedEvent = new CachedEvent(eventName, eventLocation, eventDescription, eventDateTime, eventTimeStamp, eventTagShortened, eventMaxRegistered)
		clientTempCachedEvent.createReference()

		// TODO: VALIDATE INPUT MAKE INPUTS REQUIRED
		// used to confirm route in IronRouter
		Router.go('pickLocation')
	},
	'click #resendEmailButton'(event, template) {
		Meteor.call('sendVerificationLink', (error, response) => {
 			if (error) {
				notify("Error: Could not send verification email", "danger", "center")
			}
			else{
				notify("Email verification link sent", "success", "right")
			}
		});
		Router.go('home')
	}
});


Template.createEventPage.helpers({
	isVerified: function(){
		return Meteor.user().emails[0].verified
	}
});



Template.emailNotVerifiedModal.events({
	'click #resendVerificationLink'(event, template){
		Meteor.call('sendVerificationLink', (error, response) => {
			if (error) {
				notify("Error: Could not send verification email", "danger", "center")
			}
			else{
				notify("Email verification link sent!", "success", "right")
			}
		});
		// Router.go('home')
		Modal.hide(template)
	}
});
