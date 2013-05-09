"use strict";

require.config({
	paths: {
		"console": 'lib/console/console', 
		"jquery": 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
//		Underscore: 'lib/underscore/underscore-min',
		"angular" : 'lib/angular/angular.min',
        "angular-resource": "lib/angular/angular-resource.min",
        "jquery.eislideshow": "lib/jquery/jquery.eislideshow",
        "jquery.easing": "lib/jquery/jquery.easing.1.3"
	},
	shim : {
		"jquery": {exports: "$"},
		"angular" :{
			deps: ["console", "jquery"],	
			exports : "angular"
		},
		"angular-resource": {
            deps: ["angular"]
        },
        "jquery.easing": {deps  : ["jquery"]}
	},
	baseUrl: 'assets/javascripts/'
});

require(['app'], function (App) {
	console.group("Starting bootstrap.");
	console.info("App: ", App);
	console.info("Angular: ", angular);

	App.initialize();
	
	console.groupEnd();
});