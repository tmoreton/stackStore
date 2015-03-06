'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });

});

app.controller('CheckoutCtrl', function ($scope, $kookies, CookieFactory, AuthService, AddUserFactory) {
	$scope.sideSandwiches = CookieFactory.getCookies()
	$scope.hideCheckoutButton = true;
	$scope.hideSubmitButton = true;
	$scope.isAuthenticated = AuthService.isAuthenticated();
	//show tray directive -done!
	$scope.user = AuthService.getLoggedInUser();
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
		//create a user in the db with your infomation
		if(!$scope.user){
			signup()
		}
		

		//create a new order in the db
		//which will have a reference to the current user

		//that user in the db gets another order in their order history
		//if everything works:
		//sent to success page
		$state.go('success');
		//else
		//error appears
	}
	
});

