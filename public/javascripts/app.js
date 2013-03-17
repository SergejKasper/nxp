'use strict';

// Declare app level module which depends on filters, and services
angular.module('myEvent', ['myEvent.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/activities', {templateUrl: 'assets/partials/activity-list.html', controller: ActivityListController});
    $routeProvider.when('/newActivity', {templateUrl: 'assets/partials/activity-new.html', controller: NewActivityController});
    //$routeProvider.when('/detail:activityId', {templateUrl: '/assets/partials/event-detail.html', controller: DetailController});
    $routeProvider.otherwise({redirectTo: '/activities'});
  }]);
