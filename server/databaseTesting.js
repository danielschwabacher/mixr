insertFakeData = function(){
	for (i = 0; i < 500; i++){
		console.log("creating random event, number: " + i)
		latDet = 40.008952566368045 + (Math.random() / i + ((Math.random() *(i/1000))));
		longDet = -105 + (Math.random() / i) - (Math.random() *(i/1000));
		console.log("latDet: " + latDet)
		console.log("longDet: " + longDet)
		EventCollection.insert({
			// "expireAt": new Date(),
			created_by: i+23847234/70*32 << 100,
			event_name: "name",
			event_location: "location",
			event_description: "description",
			event_dateTime: new Date(),
			event_timestamp: Math.floor(Date.now() / 1000),
			event_tag: "sports",
			event_position: { "latitude" : latDet, "longitude" : longDet },
			number_of_users_attending: 1
		});
	}
}
