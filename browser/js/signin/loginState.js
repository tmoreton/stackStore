'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'js/signin/login.template.html'
    });

});

app.controller('LoginCtrl', function ($scope, CheckUserFactory, $state, AuthService) {

          $scope.checkuser = function(){
            $scope.authorizedUser = ''
            console.log("checkuser is happening")
            if($scope.loginForm.$valid){
                CheckUserFactory.checkuser($scope.user).then(function(user){
                    if(user) {
                        console.log("authornot")
                        $state.go('success');   
                    } 
                }).catch(function(err){
                    $scope.tryAgain = "Try Again";
                    console.log(err)
                })
            }else{
                $scope.loginForm.submitted = true;
            }

          }

});
