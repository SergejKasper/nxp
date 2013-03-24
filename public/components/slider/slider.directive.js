'use strict';

/* Directives */

mymodule.directive('slider', function($parse) {
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
});