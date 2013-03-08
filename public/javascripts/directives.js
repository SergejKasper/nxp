'use strict';

/* Directives */

var myEventModule = angular.module('myEvent.directives', []);
myEventModule
		.directive(
				'masonry',
				function($parse) {
					return {
						restrict : 'A',
						replace : true,
						scope : {
							thumbnails : '=',
							thumbfilter : '='
						},
						templateUrl : '/assets/components/thumbnails/masonry.html',
						link : function postLink(scope, iElement, attrs) {
							// console.log(scope.$position);

							scope
									.$watch(
											attrs.thumbnails,
											function() {
												$
														.extend(
																$.expr[':'],
																{
																	bottomInViewport : function(
																			el) {
																		var scrollTop = (document.documentElement.scrollTop || document.body.scrollTop), elOffsetTop = $(
																				el)
																				.offset().top, elH = $(
																				el)
																				.height(), descrH = $(
																				el)
																				.find(
																						'figcaption')
																				.outerHeight(
																						true), winH = (window.innerHeight && window.innerHeight < $(
																				window)
																				.height()) ? window.innerHeight
																				: $(
																						window)
																						.height();

																		return (elOffsetTop
																				+ elH > scrollTop && elOffsetTop
																				+ elH < scrollTop
																				+ winH)
																				|| (scrollTop
																						+ winH
																						- elOffsetTop < descrH);
																	}
																});

												var $grid = $('#grid'), $items = $grid
														.children('figure');

												$grid
														.imagesLoaded(function() {

															// initialize the
															// masonry plugin
															$grid
																	.masonry({
																		itemSelector : 'figure'
																	});

															// bind the
															// mouseenter and
															// mouseleave events
															// to the
															// items
															$items
																	.on(
																			'mouseenter mouseleave',
																			function(
																					event) {

																				var $item = $(this), itemWidth = $item
																						.width(),
																				// the
																				// figcaption/description
																				// element
																				$description = $item
																						.find('figcaption');

																				clearTimeout($item
																						.data('stickytime'));

																				switch (event.type) {
																				case 'mouseenter':

																					if (!$item
																							.is(':bottomInViewport')) {
																						$item
																								.data(
																										'sticky',
																										true);
																						changeToFixed(
																								$description,
																								itemWidth);
																					}

																					$(
																							window)
																							.on(
																									'scroll',
																									function() {
																										var inviewport = $item
																												.is(':bottomInViewport');
																										if (!inviewport
																												&& !$item
																														.data('sticky')) {
																											$item
																													.data(
																															'sticky',
																															true);
																											changeToFixed(
																													$description,
																													itemWidth);
																										} else if (inviewport
																												&& $item
																														.data('sticky')) {
																											$item
																													.data(
																															'sticky',
																															false);
																											resetStyle($description);
																										}
																									});
																					break;

																				case 'mouseleave':

																					// on
																					// mouse
																					// leave
																					// and
																					// if
																					// the
																					// description
																					// is
																					// sticky,
																					// we
																					// reset
																					// the
																					// style
																					if ($item
																							.data('sticky')) {
																						$item
																								.data(
																										'sticky',
																										false);
																						resetStyle(
																								$(
																										this)
																										.find(
																												'figcaption'),
																								600);
																					}
																					$(
																							window)
																							.off(
																									'scroll');
																					break;
																				}

																			});

														});

												function changeToFixed(
														$description, itemWidth) {
													$description.css({
														position : 'fixed',
														width : itemWidth
													});
												}

												function resetStyle(
														$description, delay) {
													var stickytime = setTimeout(
															function() {
																$description
																		.css({
																			position : 'absolute',
																			width : '100%'
																		});
															}, delay || 0);
													$description.parent().data(
															'stickytime',
															stickytime);
												}
											});
						}
					};
				});
myEventModule.directive('subnav', function($parse) {
	return {
		restrict : 'A',
		replace : true,
		scope : {
			menupoints : '='
		},
		templateUrl : '/assets/components/subnav/subnav.html',
		link : function postLink(scope, iElement, attrs) {
			// console.log(scope.$position);
			iElement.ready(function() {
				$(document).scroll(
						function() {
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
						});
			});
		}
	};
});

myEventModule.directive('slider', function($parse) {
	return {
		restrict : 'A',
		scope : {
			slides : '='
		},
		replace : true,
		templateUrl : '/assets/components/slider/slider.html',
		link : function postLink(scope, iElement, attrs) {
			iElement.ready(function() {
				$(document).ready(function() {
					$('#ei-slider').eislideshow({
						easing : 'easeOutExpo',
						titleeasing : 'easeOutExpo',
						titlespeed : 1200
					})
				});
			});
		}
	};
})