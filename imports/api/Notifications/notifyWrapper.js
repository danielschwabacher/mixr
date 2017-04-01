// interface to call default notification with sitewide styling
notify = function(msg, notificationType){
	$.notify({
		// options
		title: 'mixr: ',
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
			align: "right"
		},
		offset: 20,
		spacing: 10,
		z_index: 1031,
		delay: 5000,
		timer: 1000,
		url_target: '_blank',
		mouse_over: null,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		},
		onShow: null,
		onShown: null,
		onClose: null,
		onClosed: null,
	});
}
