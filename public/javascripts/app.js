'use strict';

// Declare app level module which depends on filters, and services
angular.module('myEvent', ['myEvent.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/activities', {templateUrl: 'assets/partials/activity-list.html', controller: ActivityListController});
    $routeProvider.when('/newActivity', {templateUrl: 'assets/partials/activity-new.html', controller: NewActivityController});
    $routeProvider.when('/getActivity/:activityId', {templateUrl: '/assets/partials/activity-detail.html', controller: ActivityDetailController});
    $routeProvider.otherwise({redirectTo: '/activities'});
  }]);
