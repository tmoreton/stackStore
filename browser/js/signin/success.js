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
	    template: "<img style='height:250px' src='http://nu.spoonuniversity.com/wp-content/uploads/sites/2/2013/03/waffle.jpg'><h1>Much Success!</h1>"
    });


});

app.controller('SuccessCtrl', function($scope, getLoggedInUser, $state){
	$scope.ifLoggedIn = true;
	$scope.user = getLoggedInUser;
});
