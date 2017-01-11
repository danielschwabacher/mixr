/*
The events database holds ALL information about every event created on mixr. It is a large primary Database.
Given the size of events, data should be retrieved using the associative cross reference tables.
Structure:
{
	"_id" : uniqueEventId,
	"created_by" : userIdOfCreator,
	"event_name" : described,
	"event_location" : described,
	"event_description" : described,
	"event_dateTime" : described,
	"event_position" : {
		"latitude" : described,
		"longitude" : described
	},
	"number_of_users_attending" : described,
	"usersIds_attending" : [] *Array of userIds that registered for event
}
*/
EventCollection = new Mongo.Collection('events');
