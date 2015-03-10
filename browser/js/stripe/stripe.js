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
  // Stripe Response Handler
  var cookies = CookieFactory.getCookies();
  // var total = 0;
  // $scope.totalPrice = function() {
  //   for(var i = 0; i < cookies.length; i++) {
  //     total += cookies[i].price;
  //   }
  //     console.log('TOTAL????', total);
  // }
  $scope.submitPayment = function(status, response) {
    console.log('COOKIES????', cookies);
    console.log('HELLO STRIPE?', status, response);
    $http.post('/api/charge/', {token: response.id, cookies: cookies});
  }


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
