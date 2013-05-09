define([
	// Standard Libs
	'console', 
	'jquery',
	//'Underscore', 
	'angular',	
	// Application Files
	'Services/services',
	'Directives/directives',
	'Filters/filters',
	'Controllers/controllers'
					
], function (console, $, angular, services, directives, filters) {
	
	var initialize = function () {
	console.group("Starting application.");	
	console.info("Define Routes ");
	var app = angular.module('myEvent', [], function($routeProvider, $locationProvider) {
	    $routeProvider.when('/activities', {templateUrl: 'assets/partials/activity-list.html', controller: ActivityListController});
	    $routeProvider.when('/newActivity', {templateUrl: 'assets/partials/activity-new.html', controller: NewActivityController});
	    $routeProvider.when('/getActivity/:activityId', {templateUrl: '/assets/partials/activity-detail.html', controller: ActivityDetailController});
	    $routeProvider.otherwise({redirectTo: '/activities'});
	    $locationProvider.html5Mode(true);
	  });
	
	console.group("Initialize App");
	filters.initialize(app);
	
	console.info("Services: ", services);
	app.factory(services);
	
	console.info("Directives: ", directives);
    app.directive(directives);

    console.info("Bootstrap document with angular: ", document);
    angular.bootstrap(document, ['myEvent']);
	
	console.info("Angular compiled and executed.");
	console.groupEnd(); // [angular]
	console.groupEnd(); // [bootstrap]
	};

	return { 
		initialize: initialize
	};
});