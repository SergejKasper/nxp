'use strict';

/* Directives */
define(["jquery", "lib/jquery/jquery.easing.1.3", "lib/jquery/jquery.eislideshow"],function(){
	var slider = function($parse) {
	return {
		restrict : 'A',
		scope : {
			slides : '='
		},
		replace : false,
		templateUrl : '/assets/components/slider/slider.html',
		link : function postLink(scope, iElement, attrs) {
			window.onload = setTimeout(function() {
				iElement.imagesLoaded(function() {
					iElement.eislideshow({
						easing : 'easeOutExpo',
						titleeasing : 'easeOutExpo',
						titlespeed : 1200
					});
				});
			});
		}
	};
};

return slider;
});