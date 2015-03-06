'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.template.html'
    });

});

app.controller('SignupCtrl', function ($scope, $state, AddUserFactory) {

  $scope.signup = function(){
    console.log($scope.user);
    if($scope.signInForm.$valid){
        AddUserFactory.AddUser($scope.user).then(function(data){
            $state.go('success');
        });
    }else{
        $scope.signInForm.submitted = true;
    }
  }
});

