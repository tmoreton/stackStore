'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('addsandwich', {
        url: '/addsandwich',
        controller: 'AddSandwichCtrl',
        templateUrl: 'js/addsandwich/addsandwich.template.html'
    });

});

app.controller('AddSandwichCtrl', function ($scope, SandwichesFactory, $kookies, CookieFactory) {
	$scope.hideSubmitButton = true;
	SandwichesFactory.getSandwiches().then( function(sandwiches) {
		$scope.sandwichSelection = sandwiches;
		angular.forEach($scope.sandwichSelection, function (sandwich) {
			sandwich.image = sandwich.image? sandwich.image : "http://fc00.deviantart.net/fs70/f/2012/178/c/e/sandwich_icon_by_yamshing-d553fv4.png";
		});
	});
	var storedCookies = CookieFactory.getCookies();
	if (storedCookies) {
		$scope.sideSandwiches = storedCookies;
	}
	else {
		$scope.sideSandwiches = [];
	}
	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich)

	}

	$scope.addSandwich = function(sandwich) {
		sandwich.exists = true
		$scope.sideSandwiches.push(sandwich);
		CookieFactory.setCookies($scope.sideSandwiches);
	}

  $scope.deleteSandwich = function(id) {
    console.log('deleted?');
    SandwichesFactory.removeSandwiches(id).then(function(sandwiches) {
      $scope.sandwichSelection = sandwiches;
      angular.forEach($scope.sandwichSelection, function (sandwich) {
			sandwich.image = sandwich.image? sandwich.image : "http://fc00.deviantart.net/fs70/f/2012/178/c/e/sandwich_icon_by_yamshing-d553fv4.png";
		});
    })
  },

  $scope.updatePrice = function(id){
      SandwichesFactory.updatePrice(id).then(function(sandwiches){
        $scope.sandwichSelection = sandwiches;
        console.log(sandwiches)
        angular.forEach($scope.sandwichSelection, function (sandwich) {
          sandwich.image = sandwich.image? sandwich.image : "http://fc00.deviantart.net/fs70/f/2012/178/c/e/sandwich_icon_by_yamshing-d553fv4.png";
        });
      });
  }

});

