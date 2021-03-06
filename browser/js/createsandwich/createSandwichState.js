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
	$scope.finalPrice = 0;
	var storedCookies = CookieFactory.getCookies();
	if (storedCookies) {
		$scope.sideSandwiches = storedCookies;
		storedCookies.forEach(function(sandwich) {
			$scope.finalPrice += sandwich.price;
		});
	}
	else {
		$scope.sideSandwiches = [];
	}
	if ($scope.finalPrice === 0 ) {
		//empty tray - can't check out
		$scope.hideCheckoutButton = true;
	}
	$scope.bread = BreadFactory.bread;
	$scope.fillings = FillingsFactory.fillings;
	$scope.sandwich = {};
	$scope.isSelectedFilling= {};

	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich);
		$scope.finalPrice -= sandwich.price;
		if ($scope.finalPrice === 0 ) {
			$scope.hideCheckoutButton = true; //empty tray 
		}
	};
	
	$scope.setFillings = function() {
		$scope.fillings.forEach(function (filling) {
			$scope.isSelectedFilling[filling] = false;
		});
	};

	$scope.setFillings();
	$scope.addSandwich = function() {
		if ($scope.createSandwich.$valid) {
			$scope.sandwich.price = 6;
			$scope.sandwich.fillings = [];


			for (var key in $scope.isSelectedFilling) {
				if ($scope.isSelectedFilling.hasOwnProperty(key)) {
					if ($scope.isSelectedFilling[key]) {
						$scope.sandwich.fillings.push(key);
						$scope.sandwich.price += 0.5;
					}
				}
			}
			$scope.finalPrice += $scope.sandwich.price;
			$scope.hideCheckoutButton = false; //at least 1 sandwich now so you can check out
			
			$scope.sideSandwiches.push($scope.sandwich);
			CookieFactory.setCookies($scope.sideSandwiches);
			$scope.reset();
		}
		else {
            $scope.createSandwich.submitted = true;
            console.log("INVALID SUBMISSION");
        }

	};

	$scope.reset = function() {
		$scope.createSandwich.submitted = false;
		$scope.setFillings();
		$scope.sandwich = {
			bread: "",
			description: "",
			name: "",
			fillings: []
		};
	};
});

