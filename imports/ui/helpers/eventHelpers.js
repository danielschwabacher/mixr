import '../templates/events.html';
import '../../api/mapHandlers/initMap.js'

Template.mixrEventMap.onCreated(function(){
	console.log("on main map")
	sayHello()
});
