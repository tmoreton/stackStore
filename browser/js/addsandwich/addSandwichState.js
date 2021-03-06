'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('addsandwich', {
        url: '/addsandwich/:searched',
        controller: 'AddSandwichCtrl',
        templateUrl: 'js/addsandwich/addsandwich.template.html',
        reloadOnSearch: false
    });

});

app.controller('AddSandwichCtrl', function ($scope, SandwichesFactory, CookieFactory, $timeout, $stateParams) {
	$scope.hideSubmitButton = true;
	SandwichesFactory.getSandwiches().then(function(sandwiches) {
		if($stateParams.searched){
			$scope.sandwichSelection = $scope.searchResults;
			$stateParams.searched = false;
		}else{
			$scope.sandwichSelection = sandwiches;
		}
		angular.forEach($scope.sandwichSelection, function (sandwich) {
			//if it has an image gives a default image
			sandwich.image = sandwich.image? sandwich.image : "http://fc00.deviantart.net/fs70/f/2012/178/c/e/sandwich_icon_by_yamshing-d553fv4.png";
			// calculates average review
			var sum = 0;
			sandwich.reviews.forEach(function (review) {
				sum+= review.stars;
			});
			sandwich.averageReviewScore = Math.floor(sum / sandwich.reviews.length);
		});
		$scope.searchResults = false;
	});
	$scope.onlyHighReviews = function(){
		$scope.sandwichSelection = $scope.sandwichSelection.filter(function(sandwich){
			return sandwich.averageReviewScore >= 4;
		})
	}

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
		//empty tray- can't check out
		$scope.hideCheckoutButton = true;
	}

	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich);
		$scope.finalPrice -= sandwich.price;
		if ($scope.finalPrice === 0 ) {
			//empty tray- can't check out
			$scope.hideCheckoutButton = true;
		}

	};

	$scope.addSandwich = function(sandwich) {
		sandwich.exists = true;
		$scope.sideSandwiches.push(sandwich);
		CookieFactory.setCookies($scope.sideSandwiches);
		$scope.finalPrice += sandwich.price;
		//at least 1 sandwich so show the checkout button
		$scope.hideCheckoutButton = false; 
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

