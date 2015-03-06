'use strict';

app.controller('stripeForm', function ($scope, $state, addOrder) {
  // Stripe Response Handler
  $scope.stripeCallback = function () {
      console.log($scope)
      addOrder.addOrder($scope).then(function(data) {
        $state.go('success');
      });
      // StripeCheckout.open({
      //   key: config.get('stripe_public_key'),
      //   address: false,
      //   amount: $scope.settings.price.toString().replace('.', ''),
      //   currency: config.get('stripe_currency'),
      //   name: $scope.settings.name,
      //   description: $scope.settings.description,
      //   panelLabel: config.get('stripe_button_label'),
      //   token: function token(res) {
      //     $scope.callback({token: res});
      //   }
      // });
  };
});

app.directive('stripe', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/stripe/stripe.html'
    };
});

app.factory('addOrder', function ($http) {
    return {
        addOrder: function (postBody) {
          console.log("add user is called")
          var test = angular.toJson("helloworld")
            return $http.post('/api/build/', test).then(function(response){
                return response.data
            })
        }
    };
});



// angular.module('stripe', ['angularPayments']).config(function($window) {
//     $window.Stripe.setPublishableKey('pk_test_OxISGD7GxGhZCOofus3QFoW8');
// });

// Stripe.setPublishableKey('pk_test_OxISGD7GxGhZCOofus3QFoW8');

// app.config(function ($stateProvider) {
//     $stateProvider.state('stripe', {
//         url: '/stripe',
//         controller: 'stripeForm',
//         templateUrl: 'js/stripe/stripe.html'
//     });
// });








// angular.module('floussApp')
//   .directive('spritePurchase', ['config', 'auth', function spritePurchase(config, auth) {
//     return {
//       restrict: 'EAC',
//       scope: {
//         settings: '=spritePurchase',
//         token: '=',
//         callback: '&'
//       },
//       link: function ($scope, element, attrs) {
//         element.on('click', function click() {

//           if(!auth.isConnected()) {
//             $scope.$emit('auth:loginRequired');
//             return;
//           }

//           StripeCheckout.open({
//             key: config.get('stripe_public_key'),
//             address: false,
//             amount: $scope.settings.price.toString().replace('.', ''),
//             currency: config.get('stripe_currency'),
//             name: $scope.settings.name,
//             description: $scope.settings.description,
//             panelLabel: config.get('stripe_button_label'),
//             token: function token(res) {
//               $scope.callback({token: res});
//             }
//           });

//           return false;
//         });
//       }
//     };
//   }]);
