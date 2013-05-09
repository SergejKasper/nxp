'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
define([],function(){

	var services = {} ;
	services.version = function() {
	  return "0.1" ;
	};

	return services ;

	});