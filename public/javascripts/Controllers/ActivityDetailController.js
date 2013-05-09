define(function() {
	'use strict';

	ActivityDetailController.$inject = [ '$scope', '$routeParams', '$http', '$timeout' ];
	function ActivityDetailController($scope, $routeParams, $http, $timeout) {
		$scope.url = '/getActivity/' + $routeParams.activityId + '/get';
		$scope.item = [];
		$scope.fetchRecipients = function(){
			$http.get($scope.url).then(function(result) {
				$scope.item = result.data;
			});
		}
		$scope.fetchRecipients();
		
		$scope.counter = (new Date()).getTime();
		$scope.counterDays = 0;
		$scope.counterHours = 0;
		$scope.counterSeconds = 0;
		setInterval(function(){
	        $scope.counter--;
	        $scope.$apply();
	        console.log($scope.countDown);
	    }, 1000);  
		
		// timer
	}
});