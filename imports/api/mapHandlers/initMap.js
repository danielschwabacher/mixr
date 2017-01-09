/*
init = function(){
	console.log("in init maps -- google")
}

initMap = function(){
	return {
		center: new google.maps.LatLng(14, 12),
		zoom: 8
	}
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			console.log("pos.lat: " + pos.lat)
			return {
				center: new google.maps.LatLng(14, 12),
				zoom: 8
			}
		});
	}
	else{
        alert("mixr beta needs geolocation services to work.")
	}
};
*/
