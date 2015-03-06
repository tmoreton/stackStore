'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('addsandwich', {
        url: '/addsandwich',
        controller: 'AddSandwichCtrl',
        templateUrl: 'js/addsandwich/addsandwich.template.html'
    });

});

app.controller('AddSandwichCtrl', function ($scope, SandwichesFactory, $kookies, CookieFactory) {
	SandwichesFactory.getSandwiches().then( function(sandwiches) {
		$scope.sandwichSelection = sandwiches;
	});
	var storedCookies = CookieFactory.getCookies();
	if (storedCookies) {
		$scope.sideSandwiches = storedCookies;
	}
	else {
		$scope.sideSandwiches = [];
	}

	$scope.addSandwich = function(sandwich) {
		$scope.sideSandwiches.push(sandwich);
		CookieFactory.setCookies($scope.sideSandwiches);
	};

});

