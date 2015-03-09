'use strict';

app.controller('stripeForm', function ($scope, $state, addOrder) {
  // Stripe Response Handler
  $scope.stripeCallback = function () {

      function stripeResponseHandler(status, response) {
        var $form = $('#payment-form');

        if (response.error) {
          // Show the errors on the form
          $form.find('.payment-errors').text(response.error.message);
          $form.find('button').prop('disabled', false);
        } else {
          // response contains id and card, which contains additional card details
          var token = response.id;
          // Insert the token into the form so it gets submitted to the server
          $form.append($('<input type="hidden" name="stripeToken" />').val(token));
          // and submit
          $form.get(0).submit();
        }
      }

      Stripe.card.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val()
      }, stripeResponseHandler);
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
            return $http.post('/api/charge/', postBody).then(function(response){
                return response.data
            })
        }
    };
});
