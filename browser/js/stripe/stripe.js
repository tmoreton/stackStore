'use strict';

app.directive('stripe', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/stripe/stripe.html',
        controller: 'stripeController'
    };
});

app.controller('stripeController', function ($scope, $http, CookieFactory, AuthService, AddUserFactory, CheckoutFactory, $q, $state) {
  var cookies = CookieFactory.getCookies();
  $scope.sideSandwiches = CookieFactory.getCookies();
  $scope.hideCheckoutButton = true;
  $scope.hideSubmitButton = true;
  $scope.isAuthenticated = AuthService.isAuthenticated();
  //show tray directive -done!
  $scope.userPromise = AuthService.getLoggedInUser();
  $scope.card = {};
  //determine if logged in -done!
  if($scope.isAuthenticated){
    $scope.hideSubmitButton = false;
  }
  else{
    $state.go("signup");
  }
  
  var total = 0;
  if (cookies) {
    cookies.forEach(function(sandwich) {
      total += sandwich.price;
      $scope.totalPrice = total;
      if(!total) {
        $scope.paymentSubmitted = false;
      }
    });
  }
  
  $scope.submitPayment = function(status, response) {
    $http.post('/api/charge/', {token: response.id, total: total});
    $scope.paymentSubmitted = true;
    $scope.card = {
      number : '',
      cvc : '',
      expmonth : '',
      expyear : '',
    };
 
  };

  $scope.customSubmit = function() {
    var sandwichPromises = [];
    //send a sandwich for every sandwich in tray to database
    $scope.sideSandwiches.forEach(function(sandwich){
      sandwichPromises.push(CheckoutFactory.addNewSandwich(sandwich));
      
    });

    $q.all(sandwichPromises).then(function(sandwichIdArr){
      //use sandwich ids
      //create new order with sandwichid array
      //which will have a reference to the current user
      $q.when($scope.userPromise).then(function(user){
        var user_id = user._id;
        CheckoutFactory.addNewOrder(sandwichIdArr, user_id).then(function(){
          $scope.sideSandwiches = [];
          CookieFactory.removeAllCookies();
                  setTimeout(function() {
                    $scope.justOrdered = true;
                    $state.go('success');
                  }, 5000);
        });
        
                
      }) ; 
    });
  };


  $scope.removeSandwich = function(sandwich){
    $scope.sideSandwiches = CookieFactory.removeCookie(sandwich);
    $scope.finalPrice -= sandwich.price;
  };

});
