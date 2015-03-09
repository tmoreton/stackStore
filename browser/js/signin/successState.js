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
	$scope.user = getLoggedInUser;
  $scope.userLoggedIn = true; 
  if ($scope.user.orders.length) {
    $scope.numOrders = $scope.user.orders.length  
  } else{
    $scope.numOrders = 0;
  }
  // $scope.orders = $scope.user.orders;
  // $scope.sandwiches = []
  // $scope.orders.forEach(function(sandID){
  //   $scope.sandwiches.push(SandwichesFactory.findSandwich(sandID))
  // }
  // console.log("these are the sandwiches",$scope.sandwiches)
  
  
});
