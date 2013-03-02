jQuery(window).load(function() {

		$x = $(window).width();
		if ($x > 1024) {
			jQuery("#content .row").preloader();
		}

		jQuery('.magnifier').touchTouch();
		jQuery('.spinner').animate({
			'opacity' : 0
		}, 1000, 'easeOutCubic', function() {
			jQuery(this).css('display', 'none')
		});
	});