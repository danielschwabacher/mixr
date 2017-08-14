
/* --------------------------------------------------------------------------
 *  These are methods that will validate the user provided information before
 *  handing it over to the database
 *  Things to be aware of:
 *	1) All validations must be done server side to ensure server security
 *  2) There are various regular expressions that more concisely represent certain patterns
 * 	   but the more verbose version allows easier modification in case new characters
 *     need to be allowed
 *  3) All functions besides validateAll return bools
 *
 * -------------------------------------------------------------------------- */


Meteor.methods({
  // Calls all validation functions to confirm everything is correctly formatted
  validateAll: function(eventName, eventLocation, eventDescription) {
  	var nameCheck = validateName(eventName)
  	var locCheck = validateLocation(eventLocation)
  	var descCheck = validateDescription(eventDescription)

  	var result = (nameCheck && locCheck && descCheck)
    
  	if(!result) {
  		console.log("Failed validation; event not mixr-cached or added to DB")
  	}
  	return result
  }
});

// Requires the name to be a minimum of 1 character and a maximum
// of 20 alphanumeric characters and spaces
validateName = function(eventName) {
  var re = /^[a-zA-Z0-9\s ]{1,20}$/
  var result = re.test(eventName)
  if (!result) {
    console.log("Error: Restricted characters in event name")
  }
  return result
}

// Requires the location to be a minimum of 1 character and a maximum
// of 64 alphanumeric characters, spaces, commas, and hyphens
validateLocation = function(eventLocation) {
  var re = /^[-,a-zA-Z0-9\t ]{1,64}$/
  var result = re.test(eventLocation)
  if (!result) {
    console.log("Error: restricted characters in event location")
  }
  return result
}

// Allows the event description to be 155 character(s) (because fuck 140 character limits)
// Does NOT require a description to pass
validateDescription = function(eventDescription) {
  var re = /[.* ]{0,155}$/
  var result = re.test(eventDescription)
  if (!result) {
    console.log("Error: The event description can only be 155 characters")
  }
  return result
}
