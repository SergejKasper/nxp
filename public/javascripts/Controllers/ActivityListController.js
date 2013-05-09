define(function() {
	'use strict';
	ActivityListController.$inject = ['$scope','$http'];
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
});