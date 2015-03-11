'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('success', {
    	resolve: {
    		getLoggedInUser: function(AuthService, $state, $http){
            return AuthService.getLoggedInUser(true).then(function(user){
              if(user){
                console.log(user);
                return user;
              }else{
                $state.go("login");
              }
            });
    		}

    	},
	    url: '/success',
	    controller: 'SuccessCtrl',
	    templateUrl: "js/profile/profile.html"
    });
});

app.controller('SuccessCtrl', function($scope, getLoggedInUser, $kookies, $state, SandwichesFactory){  
  
  $scope.user = getLoggedInUser;
  $scope.numOrders = $scope.user.orders.length;
  
  $scope.userLoggedIn = true; 
 
});
