'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('success', {
    	resolve: {
    		getLoggedInUser: function(AuthService, $state){
    			return AuthService.getLoggedInUser().then(function(user){
    				if(user){
    					return user
    				}else{
   						$state.go("login")
   					}
   				})
    		}

    	},
	    url: '/success',
	    controller: 'SuccessCtrl',
	    templateUrl: "js/profile/profile.html"
    });
});

app.controller('SuccessCtrl', function($scope, getLoggedInUser, $state){
	$scope.ifLoggedIn = true;
	$scope.user = getLoggedInUser;
});
