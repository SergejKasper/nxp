define([ 'Directives/playerelement.directive', 'Directives/slider.directive',
		'Directives/subnav.directive', 'Directives/expandablethumbs.directive' ],
		function(playerelement, slider, subnav, expandablethumbs) {

			var directives = {};

			directives.playerelement = playerelement;
			directives.slider = slider;
			directives.subnav = subnav;
			directives.expandableThumbs = expandablethumbs;

			return directives;
		});