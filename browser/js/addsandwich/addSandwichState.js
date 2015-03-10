'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('addsandwich', {
        url: '/addsandwich/:searched',
        controller: 'AddSandwichCtrl',
        templateUrl: 'js/addsandwich/addsandwich.template.html'
    });

});

app.controller('AddSandwichCtrl', function ($scope, SandwichesFactory, CookieFactory, $timeout, $stateParams) {
	$scope.hideSubmitButton = true;
	SandwichesFactory.getSandwiches().then(function(sandwiches) {
		console.log("searchresults",$scope.searchResults)
		if($stateParams.searched){
			$scope.sandwichSelection = $scope.searchResults
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

	var storedCookies = CookieFactory.getCookies();
	if (storedCookies) {
		$scope.sideSandwiches = storedCookies;
	}
	else {
		$scope.sideSandwiches = [];
	}
	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich);

	};

	$scope.addSandwich = function(sandwich) {
		sandwich.exists = true;
		$scope.sideSandwiches.push(sandwich);
		CookieFactory.setCookies($scope.sideSandwiches);
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
		return new Array(sandwich.averageReviewScore);
	};


});

