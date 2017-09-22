// interface to call default notification with sitewide styling
notify = function(msg, notificationType, alignment){
	$.notify({
		// options
		message: msg,
		target: '_blank'
	},{
		// settings
		element: 'body',
		position: null,
		type: notificationType,
		allow_dismiss: true,
		newest_on_top: false,
		showProgressbar: false,
		placement: {
			from: "top",
			align: alignment
		},
		offset: 20,
		spacing: 10,
		z_index: 1031,
		delay: 800,
		timer: 700,
		url_target: '_blank',
		mouse_over: null,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		},
		onShow: null,
		onShown: null,
		onClose: function(){
			console.log("closed notification")
		},
		onClosed: null,
	});
	console.log("called notify")
}
