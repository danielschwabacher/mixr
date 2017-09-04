// These modals are defined in eventResponseModalHelpers.js because of a weird
// meteor bug that is causing template events to not register in this file...
function outputUpdate(vol) {
	document.querySelector('.timeSlider').value = vol;
}