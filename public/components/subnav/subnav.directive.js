'use strict';

/* Directives */

mymodule.directive('subnav', function($parse) {
	return {
		restrict : 'A',
		replace : false,
		scope : {
			isotopeItemFilter : '=isotopeItemFilter',
			menupoints : '=menupoints'
		},
		link : function postLink(scope, iElement, attrs) {
			// console.log(scope.$position);
			iElement.ready(function() {
				$(document).scroll(navAdjust);
				function navAdjust() {
					// If has not activated (has no attribute "data-top"
					setTimeout(function() {

						if (!$('#subnav').attr('data-top')) {
							// If already fixed, then do nothing
							if ($('#subnav').hasClass('subnav-fixed'))
								return;
							// Remember top position
							var offset = $('#subnav').offset()
							$('#subnav').attr('data-top', offset.top);
						}

						if ($('#subnav').attr('data-top')
								- $('#subnav').outerHeight() <= $(this)
								.scrollTop())
							$('#subnav').addClass('subnav-fixed');
						else
							$('#subnav').removeClass('subnav-fixed');
					});
				}
			});
		}
	};
});