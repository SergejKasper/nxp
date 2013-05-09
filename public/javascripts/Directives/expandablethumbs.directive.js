'use strict';

/* Directives */
define(["components/thumbnails.main.grid"],function(){
	var expandablethumbs = function($log, $timeout) {
	
	var linker = function postLink(scope, lElement, attrs) {
			
		scope.$on('$viewContentLoaded', function() {
			lElement.ready(function() {
				$log.info("TESTTT");
				$log.info("items: " + scope.items);
				$log.info("filter: " + scope.isotopeItemFilter);
				var Grid = (gridbuilder)();
				Grid.init();
				
			});
		});	
		
		scope.$watch('items', function(newval, oldval) {
			lElement.ready(function() {
				$log.info("TESTTT");
				$log.info("items: " + scope.items);
				$log.info("filter: " + scope.isotopeItemFilter);
				var Grid = (gridbuilder)();
				Grid.init();
				
			});
		});
		
		scope.$watch('isotopeItemFilter', function(newval, oldval) {
			$log.info(scope.isotopeItemFilter);
			if (newval != null || newval != "") {
				var val = newval;
				$(".filter-out").removeClass("filter-out");
				if (val) {
					lElement.children("li").filter(
							function() {
								return $(this).find("a").attr("data-title")
										.toLowerCase()
										.indexOf(val) === -1;
							}).addClass("filter-out");
				}
			}
		});
		

			return {
				restrict : 'C',
				replace : false,
				scope : {
					items : '=items',
					isotopeItemFilter : '=isotopeItemFilter'
				},
				link : linker
			};
		};

	};

return expandablethumbs;
});