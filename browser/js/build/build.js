'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('build', {
        url: '/build',
        controller: 'BuildCtrl',
        templateUrl: 'js/build/build.html'
    });

});

app.controller('BuildCtrl', function ($scope, $state, SandwichesFactory, BreadFillings) {
	$scope.bread = BreadFillings.bread;
	$scope.fillings = BreadFillings.fillings;
	$scope.sandwich = {};
	$scope.isSelectedFilling= {};

	$scope.setFillings = function() {
		$scope.fillings.forEach(function (filling) {
			$scope.isSelectedFilling[filling] = false;
		});
	}
	$scope.setFillings();
	//$scope.selectedFillings = [ ];
	$scope.sideSandwiches = [];

	$scope.addSandwich = function() {
		$scope.sandwich.fillings = [];

		for (var key in $scope.isSelectedFilling) {
			if ($scope.isSelectedFilling.hasOwnProperty(key)) {
				if ($scope.isSelectedFilling[key]) {
					$scope.sandwich.fillings.push(key);
				}
			}
		}
		console.log($scope.sandwich);
		$scope.sideSandwiches.push($scope.sandwich);


		SandwichesFactory.addNewSandwich($scope.sandwich).then( function(response) {
			$scope.reset();
	  });

	},

	$scope.reset = function() {
		$scope.setFillings();
		// $scope.sandwich.bread = "";
		// $scope.sandwich.description = "";
		// $scope.sandwich.name = "";
		$scope.sandwich = {
			bread: "",
			description: "",
			name: "",
			fillings: []
		};
	}
});

// $scope.breadChosen =  function() {
// 	    SandwichesFactory.addNewSandwich($scope.breadType).then( function(response) {
// 	        console.log(response);
// 	    });
// 	}
