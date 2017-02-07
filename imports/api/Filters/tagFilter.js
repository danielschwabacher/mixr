// A tag filter is passed to the onCreated function of the primary map,
// it provides an easy way to specifiy which tags to display on the map
TagFilter = function(rawTagIds){
	this.rawIncludes = rawTagIds
	this.mongoIncludes = []
}

TagFilter.prototype.populateTags = function(){
	for (item of this.rawIncludes){
		switch (item) {
			case "sportsCheckboxFilter":
				this.mongoIncludes.push("sports")
				break;
  			case "performancesCheckboxFilter":
				this.mongoIncludes.push("performances")
				break;
			case "artsCheckBoxFilter":
				this.mongoIncludes.push("arts")
				break;
			case "academicInterestFilter":
				this.mongoIncludes.push("academicInterest")
				break;
			case "otherFilter":
				this.mongoIncludes.push("other")
				break;
		}
	}
}
TagFilter.prototype.setSessionTags = function(){
	Session.set('tagIncludes', this.mongoIncludes)
}

TagFilter.prototype.sayIds = function(){
	for (item of this.mongoIncludes){
		console.log("Item in tag filter (mongo includes) is (from sayIds): " + item)
	}
}
