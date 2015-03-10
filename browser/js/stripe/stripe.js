'use strict';

app.directive('stripe', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/stripe/stripe.html',
        controller: 'stripeController'
    };
});

app.controller('stripeController', function ($scope, $http, CookieFactory) {
  var cookies = CookieFactory.getCookies();
  
  var total = 0;
  cookies.forEach(function(sandwich) {
    total += sandwich.price;
    $scope.totalPrice = total;
    if(!total) {
      $scope.totalPrice = null;
    }
  });


  

  $scope.submitPayment = function(status, response) {
    $http.post('/api/charge/', {token: response.id, total: total});
    $scope.paymentSubmitted = true;
    $scope.number = '';
    $scope.cvc = '';
    $scope.expmonth = '';
    $scope.expyear = '';
  }

  $scope.onSubmit = function() {

  }
  // $scope.reset = function() {
  //   $scope.cvc = 

  //   }
  // };

});




// app.factory('addOrder', function ($http) {
//     return {
//         addOrder: function (postBody) {
//           console.log("add user is called")
//             return $http.post('/api/charge/', postBody).then(function(response){
//                 return response.data
//             })
//         }
//     };
// });
