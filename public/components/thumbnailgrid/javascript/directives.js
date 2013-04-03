'use strict';

/* Directives */

mymodule.directive('ogGrid', function($log) {
	
	var linker = function postLink(scope, lElement, attrs) {
			
			
			lElement.ready(function() {
				$log.info("TESTTT");
				var Grid = (gridbuilder)();
				Grid.init();
			});
			
			scope.$watch('isotopeItemFilter', function(changed) {
				if(Grid!=null){
					Grid.hidePreview();
					Grid =  null;
				}
				var Grid = (gridbuilder)();
				Grid.init();
		    });

		};

	return {
		restrict : 'C',
		replace : false,
		scope : true,
		link : linker
	};
});