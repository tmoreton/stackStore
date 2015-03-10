'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('addsandwich', {
        url: '/addsandwich',
        controller: 'AddSandwichCtrl',
        templateUrl: 'js/addsandwich/addsandwich.template.html'
    });

});

app.controller('AddSandwichCtrl', function ($scope, SandwichesFactory, CookieFactory, $timeout) {
	$scope.hideSubmitButton = true;
	SandwichesFactory.getSandwiches().then( function(sandwiches) {
		$scope.sandwichSelection = sandwiches;
		angular.forEach($scope.sandwichSelection, function (sandwich) {
			sandwich.image = sandwich.image? sandwich.image : "http://fc00.deviantart.net/fs70/f/2012/178/c/e/sandwich_icon_by_yamshing-d553fv4.png";
			var sum = 0;
			sandwich.reviews.forEach(function (review) {
				sum+= review.stars;
			});
			sandwich.averageReviewScore = Math.floor(sum / sandwich.reviews.length);
		});
	});

	$scope.finalPrice = 0;
	var storedCookies = CookieFactory.getCookies();
	if (storedCookies) {
		$scope.sideSandwiches = storedCookies;
		storedCookies.forEach(function(sandwich) {
			$scope.finalPrice += sandwich.price
		})
	}
	else {
		$scope.sideSandwiches = [];
	}
	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich);
		$scope.finalPrice -= sandwich.price;

	};

	$scope.addSandwich = function(sandwich) {
		sandwich.exists = true;
		$scope.sideSandwiches.push(sandwich);
		CookieFactory.setCookies($scope.sideSandwiches);
		$scope.finalPrice += sandwich.price;

	};

	$scope.deleteSandwich = function(id) {

    SandwichesFactory.removeSandwiches(id).then(function(sandwiches) {
      $scope.sandwichSelection = sandwiches;

      angular.forEach($scope.sandwichSelection, function (sandwich) {
			sandwich.image = sandwich.image? sandwich.image : "http://fc00.deviantart.net/fs70/f/2012/178/c/e/sandwich_icon_by_yamshing-d553fv4.png";
		});
    });
  };

	$scope.updatePrice = function(id, price){
      SandwichesFactory.newPrice(id, price); 
      $scope.sandwichSelection.forEach(function(sandwich) {
      	if(sandwich._id === id) {
      		sandwich.price = price;
      		sandwich.updated = "Price updated!";
      		$timeout(function() {
      			sandwich.updated = false;
      		}, 2000);
      	}
      });
  	};

	$scope.getAvgStars = function(sandwich) {

		if (sandwich.averageReviewScore === 0 || isNaN(sandwich.averageReviewScore)) {
			return [ ]; //no reviews
		}
		return new Array(sandwich.averageReviewScore);
	};
});

