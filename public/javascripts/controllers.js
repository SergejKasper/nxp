'use strict';

/* Controllers */

function IndexPageController($scope) {
	$scope.subnav = {
		"menupoints" : [ {
			"name" : "Alle Events",
			"url" : "#"
		}, {
			"name" : "Meine Events",
			"url" : "#"
		}, {
			"name" : "Neues Event",
			"url" : "#/newActivity"
		}
		],
		"dropdown" : []
	};
	
	$scope.slides = [
	{"title" : "Die NXP ist zurück", "subtitle": "bald ist es soweit"},
	{"title" : "Die letzte NXP war legendär", "subtitle": "wir setzen einen drauf"},
	{"title" : "Du bist gefragt", "subtitle": "gestallte unsere Party"},
	{"title" : "Deine Stimme zählt", "subtitle": "wähle die Getränke"},
	{"title" : "Beteilige dich vor Ort", "subtitle": "wähle die Songs"},
	{"title" : "Sei Teil des Rahmenprogramms", "subtitle": "Plane deinen Abend!"},
	{"title" : "Interessiert?!", "subtitle": "Anmelden und Los!"}
	];
}

function NewActivityController() {
}

function ActivityListController($scope, $http) {
	$scope.url = '/getActivities';
	$scope.activities = [];
	$scope.fetchRecipients = function(){
		$http.get($scope.url).then(function(result) {
			$scope.activities = result.data;
		});
	}
	$scope.fetchRecipients();
    $scope.sortAsc = true; 
    $scope.update = function() { $scope.sortAsc = !$scope.sortAsc; };
    $scope.isotopeItemFilter = [];
}
function ActivityDetailController($scope, $routeParams, $http) {
	$scope.url = '/getActivity/' + $routeParams.activityId + '/get';
	$scope.item = [];
	$scope.fetchRecipients = function(){
		$http.get($scope.url).then(function(result) {
			$scope.item = result.data;
		});
	}
	$scope.fetchRecipients();
}