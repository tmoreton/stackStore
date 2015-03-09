'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        resolve: {
            getLoggedInUser: function(AuthService, $state){
                return AuthService.getLoggedInUser().then(function(user){
                    if(user){
                        $state.go("checkout");
                    }
                })
            }
        },
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.template.html'
    });

});

app.controller('SignupCtrl', function ($scope, $state, AddUserFactory, CheckUserFactory, CookieFactory) {
    $scope.signup = function(){
        console.log("signup is called");
        if($scope.signInForm.$valid){//adds user to the db
            console.log("past the validator")
            AddUserFactory.AddUser($scope.user).then(function(){//if sucessful then logs in the user automatically
                CheckUserFactory.checkuser($scope.user).then(function(user){
                    console.log("successfully checked for user");
                    if(user) {
                        $state.go("checkout");
                    }else{
                        $state.go('success');
                    }
                });
            });
        }
    };
});

