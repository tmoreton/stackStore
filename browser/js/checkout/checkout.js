'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $state, CookieFactory, AuthService, AddUserFactory, CheckoutFactory, $q) {
	$scope.sideSandwiches = CookieFactory.getCookies();
	$scope.finalPrice = 0;
	if ($scope.sideSandwiches) {
		$scope.sideSandwiches.forEach(function(sandwich) {
			$scope.finalPrice += sandwich.price;
		});
	}
	$scope.hideCheckoutButton = true;
	$scope.hideSubmitButton = true;
	$scope.isAuthenticated = AuthService.isAuthenticated();
	//show tray directive -done!
	$scope.userPromise = AuthService.getLoggedInUser();
	
	//determine if logged in -done!
	if($scope.isAuthenticated){
		$scope.hideSubmitButton = false;
		//if you are:
		//grab your financial information with Stripe?
		//needs to be done
	}
	else{
		$state.go("signup");
	}
	
});

