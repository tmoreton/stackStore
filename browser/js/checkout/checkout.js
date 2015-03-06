'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $kookies, CookieFactory, AuthService, AddUserFactory, CheckoutFactory, $q) {
	$scope.sideSandwiches = CookieFactory.getCookies()
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
		//if you are not:
		//sign up form will appear-done!
	}
	
	 var signup = function(){
	    console.log($scope.user);
	    if($scope.signInForm.$valid){
	        AddUserFactory.AddUser($scope.user).then(function(data){
	            
	        });
	    }else{
	        $scope.signInForm.submitted = true;
	    }
	  }	
	$scope.submitOrder = function(){
		//if you are not signed in
		//create a user in the db with your information
		if(!$scope.user){
			signup()
		}
		
		var sandwichPromises = []
		//send a sandwich for every sandwich in tray to database
		$scope.sideSandwiches.forEach(function(sandwich){
			sandwichPromises.push(CheckoutFactory.addNewSandwich(sandwich));
		})

		$q.all(sandwichPromises).then(function(sandwichIdArr){
			//use sandwich ids
			//create new order with sandwich
			//which will have a reference to the current user
			$q.when($scope.userPromise).then(function(user){
				console.log("this is what we think is the user id",user._id)
				var user_id = user._id;
				console.log("this is the user id that we are sending to the db",user_id)
				CheckoutFactory.addNewOrder(sandwichIdArr, user_id)
			})	

		});
		

		

		//that user in the db gets another order in their order history
		//if everything works:
		//sent to success page
		// $state.go('success');
		//else
		//error appears
	}
	
});

