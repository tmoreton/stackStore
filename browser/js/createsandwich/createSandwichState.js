'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('createsandwich', {
        url: '/buildsandwich',
        controller: 'CreateSandwichCtrl',
        templateUrl: 'js/createsandwich/createSandwich.template.html'
    });

});

app.controller('CreateSandwichCtrl', function ($scope, SandwichesFactory, BreadFactory, FillingsFactory, CookieFactory, $kookies) {
	$scope.hideSubmitButton = true;
	var storedCookies = CookieFactory.getCookies();
	if (storedCookies) {
		$scope.sideSandwiches = storedCookies;
	}
	else {
		$scope.sideSandwiches = [];
	}
	$scope.bread = BreadFactory.bread;
	$scope.fillings = FillingsFactory.fillings;
	$scope.sandwich = {};
	$scope.isSelectedFilling= {};
	// CookieFactory.setCookies();
	// $cookies.hello = undefined;
	// console.log($cookies);

	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich)

	}
	
	$scope.setFillings = function() {
		$scope.fillings.forEach(function (filling) {
			$scope.isSelectedFilling[filling] = false;
		});
	}

	$scope.setFillings();
	//$scope.selectedFillings = [ ];

	$scope.addSandwich = function() {
		if ($scope.createSandwich.$valid) {
			$scope.sandwich.price = 10;
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
			CookieFactory.setCookies($scope.sideSandwiches);
			$scope.reset();
		}
		else {
            $scope.createSandwich.submitted = true;
            console.log("INVALID SUBMISSION");
        }

	},

	$scope.reset = function() {
		$scope.createSandwich.submitted = false;
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
	};
});

// $scope.breadChosen =  function() {
// 	    SandwichesFactory.addNewSandwich($scope.breadType).then( function(response) {
// 	        console.log(response);
// 	    });
// 	}
