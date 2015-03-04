'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('build', {
        url: '/build',
        controller: 'BuildCtrl',
        templateUrl: 'js/build/build.html'
    });

});

app.controller('BuildCtrl', function ($scope, SandwichesFactory, BreadFillings) {
	$scope.bread = BreadFillings.bread;
	$scope.fillings = BreadFillings.fillings;
	$scope.isSelectedFilling= {};
	$scope.fillings.forEach(function (filling) {
		$scope.isSelectedFilling[filling] = false;
	});

	//$scope.selectedFillings = [ ];


	$scope.addSandwich = function() {
		$scope.sandwich.fillings = [];
		for (var key in $scope.isSelectedFilling) {
			if ($scope.isSelectedFilling.hasOwnProperty(key)) {
				if ($scope.isSelectedFilling[key]) {
					$scope.sandwich.fillings.push(key);
				}
			}
		}
		SandwichesFactory.addNewSandwich($scope.sandwich).then( function(response) {
	        console.log('controller response',response);
	    });
	}
});

// $scope.breadChosen =  function() {
// 	    SandwichesFactory.addNewSandwich($scope.breadType).then( function(response) {
// 	        console.log(response);
// 	    });
// 	}