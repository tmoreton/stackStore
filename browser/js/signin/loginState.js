'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        resolve: {
            getLoggedInUser: function(AuthService, $state){
                return AuthService.getLoggedInUser().then(function(user){
                    if(user){
                        $state.go("success");
                    }
                })
            }

        },
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'js/signin/login.template.html'
    });

});

app.controller('LoginCtrl', function ($scope, CookieFactory, CheckUserFactory, $state, AuthService) {

          $scope.checkuser = function(){
            $scope.authorizedUser = ''
            if($scope.loginForm.$valid){
                CheckUserFactory.checkuser($scope.user).then(function(user){
                    if(user) {
                        var tray = CookieFactory.getCookies();
                        if (tray.length){
                            $state.go("checkout")
                        }else{
                            $state.go('success');
                        }
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
