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
	$scope.sideSandwiches.forEach(function(sandwich) {
		$scope.finalPrice += sandwich.price;
	})
	$scope.hideCheckoutButton = true;
	$scope.hideSubmitButton = true;
	$scope.isAuthenticated = AuthService.isAuthenticated();
	//show tray directive -done!
	$scope.userPromise = AuthService.getLoggedInUser();
	
	console.log("promise?",$scope.userPromise);
	//determine if logged in -done!
	if($scope.isAuthenticated){
		$scope.hideSubmitButton = false;
		//if you are:
		//grab your financial information with Stripe?
		//needs to be done
	}
	else{
		$state.go("signup")
	}
	$scope.submitOrder = function(){
		var sandwichPromises = []
		//send a sandwich for every sandwich in tray to database
		$scope.sideSandwiches.forEach(function(sandwich){
			sandwichPromises.push(CheckoutFactory.addNewSandwich(sandwich));
			
		})

		$q.all(sandwichPromises).then(function(sandwichIdArr){
			console.log("sandwich promises convered into an array")
			//use sandwich ids
			//create new order with sandwichid array
			//which will have a reference to the current user
			$q.when($scope.userPromise).then(function(user){
				var user_id = user._id;
				CheckoutFactory.addNewOrder(sandwichIdArr, user_id).then(function(){
					$scope.sideSandwiches = [];
					CookieFactory.removeAllCookies();
	                $state.go('success');
				});
				
                
			})	
		});
	}
	$scope.removeSandwich = function(sandwich){
		$scope.sideSandwiches = CookieFactory.removeCookie(sandwich);
		$scope.finalPrice -= sandwich.price;
	}
	
});

