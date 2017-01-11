/*
The userEvents database is a cross reference table. It is used to efficently query
usersIds_attending given a userId.
Structure:
{
	"_id" : uniqueTableId,
	"user" : userIdOfOwner,
	"events" : [
		{
			eventId: uniqueEventId,
			owned: boolean -- does the user own this event?
		}
	] *Array of objects containing {eventId, owned} belonging to user
}
*/
UserEventsCrossReferenceCollection = new Mongo.Collection('userEvents');
