'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'js/signin/login.html'
    });

});

app.controller('LoginCtrl', function ($scope, checkuser, $state, AuthService) {

          $scope.checkuser = function(){
            $scope.authorizedUser = ''
            console.log("checkuser is happening")
            console.log($scope.user)
            checkuser.checkuser($scope.user).then(function(user){
                if(AuthService.isAuthenticated) {
                    $state.go('success');   
                } 
            });
            console.log("authorizedUser", $scope.authorizedUser)
          }
});
