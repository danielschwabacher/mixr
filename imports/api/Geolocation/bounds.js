/*
	The Bounds object is used to specify the
	areas in which mixr will function. It works by
	defining a coordinate based bounding box which
	is eventually exposed to the mapping functions.

	It takes two arguments:
	southwest_bounds and northeast_bounds. Both of these
	are LatLng pairs which specify where to overlay
	a simulated bounding box.

	Here is an example bounding box:
	+---------------2
	|               |
	|               |
	|     County    |
	|               |
	|               |
	|               |
	1---------------+

	In this example, southwest_bounds is
	labeled 1 and northeast_bounds is labeled 2.

	A bounding box is created by 'drawing' a line from
	these two LatLng pairs. Thus, any bounding box generated
	by this object is always a rectangle. 
*/

Bounds = function(southwest_bounds, northeast_bounds){
	this.rawIncludes = rawTagIds
	this.mongoIncludes = []
}


		// Lat, Lng coordinate pairs which define the Boulder area
		// bounding box.
		var BOULDER_BOUNDS = new google.maps.LatLngBounds(
			// Southwest bound
     		new google.maps.LatLng(39.964069, -105.301758),
			// Northeast bound
     		new google.maps.LatLng(40.094551, -105.178197)
   		);
