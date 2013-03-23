'use strict';

/* Directives */

var myEventModule = angular.module('myEvent.directives', []);

function appendListener($items) {
	$
			.extend(
					$.expr[':'],
					{
						bottomInViewport : function(el) {
							var scrollTop = (document.documentElement.scrollTop || document.body.scrollTop), elOffsetTop = $(
									el).offset().top, elH = $(el).height(), descrH = $(
									el).find('figcaption').outerHeight(true), winH = (window.innerHeight && window.innerHeight < $(
									window).height()) ? window.innerHeight : $(
									window).height();

							return (elOffsetTop + elH > scrollTop && elOffsetTop
									+ elH < scrollTop + winH)
									|| (scrollTop + winH - elOffsetTop < descrH);
						}
					});

	$items.on('mouseenter mouseleave', function(event) {

		var $item = $(this), itemWidth = $item.width(),
		// the figcaption/description element
		$description = $item.find('figcaption');

		clearTimeout($item.data('stickytime'));

		switch (event.type) {
		case 'mouseenter':

			if (!$item.is(':bottomInViewport')) {
				$item.data('sticky', true);
				changeToFixed($description, itemWidth);
			}
			// bind the scroll event to the window while hovering an item
			// while scrolling, we check if the description should be rendered
			// or not
			$(window).on('scroll', function() {
				var inviewport = $item.is(':bottomInViewport');
				if (!inviewport && !$item.data('sticky')) {
					$item.data('sticky', true);
					changeToFixed($description, itemWidth);
				} else if (inviewport && $item.data('sticky')) {
					$item.data('sticky', false);
					resetStyle($description);
				}
			});
			break;

		case 'mouseleave':

			// on mouse leave and if the description is sticky, we reset the
			// style
			if ($item.data('sticky')) {
				$item.data('sticky', false);
				resetStyle($(this).find('figcaption'), 200);
			}
			$(window).off('scroll');
			break;
		}

	});

	function changeToFixed($description, itemWidth) {
		$description.css({
			position : 'fixed',
			width : itemWidth
		});
	}

	function resetStyle($description, delay) {
		var stickytime = setTimeout(function() {
			$description.css({
				position : 'absolute'
			});
		}, delay || 0);
		$description.parent().data('stickytime', stickytime);
	}

}

myEventModule
		.directive(
				'isotope',
				function() {

					var linker = function(scope, elem, attrs) {

						var setupDone = false;

						var setObj = function(asc) {
							return {
								itemSelector : 'article',
								filter : '*',
								resizable : true,
								resizesContainer : true,
								getSortData : {
									title : function(e) {
										return e.find('h2').text();
									}
								},
								sortBy : 'title',
								sortAscending : asc
							};
						};

						var setup = function() {
							// replace old
							elem.find('article').remove();
							var articles = [];
							scope.list
									.forEach(function(item) {
										var i = 1;
										articles
												.push('<article class="isotope-item-frame '
														+ item.title
														+ '"><figure><img src="assets/components/thumbnails/images/'
														+ item.path
														+ '"/><figcaption><h3 id="'
														+ item.title
														+ '">'
														+ '<a href="#/getActivity/'
														+ item.id
														+ '">'
														+ item.title
														+ '</a>'
														+ '<span class="actions pull-right">'
														+ '<a href="#/getActivity/'
														+ item.id
														+ '"><i class="icon-fullscreen"></i></a>'
														+ '<a href="#/likeActivity/'
														+ item.id
														+ '"><i class="icon-heart"></i></a>'
														+ '<a href="#/goActivity/'
														+ item.id
														+ '"><i class="icon-ok"></i></a>'
														+ '</span></h3>'
														+ item.description
														+ '</figcaption></figure></article>');
										i++;
									});
							elem.append(articles.join("\n"));
							elem.imagesLoaded(function() {
								appendListener(elem.children('figure'));
								elem.isotope(setObj(scope.sortAsc,
										scope.itemFilter));
								setupDone = true;
							});
						};

						scope.$watch('list', function(newval, oldval) {
							if (newval.length > 0)
								setup();
						});

						scope.$watch('sortAsc', function(newval, oldval) {
							if (setupDone)
								elem.isotope(setObj(newval, scope.itemFilter));
						});

						scope.$watch('itemFilter', function(newval, oldval) {
							if (setupDone) {
								var val = newval.toLowerCase();
								$(".filter-out").removeClass("filter-out");
								if (val) {
									elem.children(":not(.blank)").filter(
											function() {
												return $(this).find("h3")
														.text().toLowerCase()
														.indexOf(val) === -1;
											}).addClass("filter-out");
									elem.isotope({
										filter : ':not(.filter-out)'
									});
								} else {
									elem.isotope({
										filter : '*'
									});
								}
							}
						});

						window.onload = setTimeout(function() {
							if (setupDone)
								elem.isotope(setObj(scope.sortAsc,
										scope.itemFilter));
						});

					}

					return {
						restrict : 'A',
						template : '<section class="isotope-container-section"><div class="grid clearfix" id="grid"></div></section>',
						replace : true,
						scope : {
							list : '=isotope',
							sortAsc : '=itemAsc',
							itemFilter : '=itemFilter'
						},
						link : linker

					};
				});

myEventModule.directive('subnav', function($parse) {
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

myEventModule.directive('slider', function($parse) {
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

myEventModule.directive('playerelement', function($parse, $timeout) {
	return {
		restrict : 'AC',
		scope : true,
		replace : false,
		template : '<audio preload="none" controls loop>'
				+ '<source src="assets/media/Barthezz-Infected.mp3"/>'
				+ '<source src="assets/media/Barthezz-Infected.ogg"/>'
				+ '</audio>',
		link : function(scope, elem, attrs) {
			elem.ready(function() {
				window.onload = elem.children('audio').audioPlayer();
			});
		}
	};

});