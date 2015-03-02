'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.html'
    });

});

app.controller('SignupCtrl', function ($scope, AddUser) {
  $scope.signup() = AddUser.AddUser();
});
