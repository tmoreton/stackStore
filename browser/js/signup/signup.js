'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.html'
    });

});

app.controller('SignupCtrl', function ($scope, $state, AddUser) {

  $scope.signup = function(){
    console.log($scope.user);
    if($scope.signInForm.$valid){
        AddUser.AddUser($scope.user).then(function(data){
            $state.go('success');
        });
    }else{
        $scope.signInForm.submitted = true;
    }
  }
});

