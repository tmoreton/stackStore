'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('build', {
        url: '/build',
        controller: 'BuildCtrl',
        templateUrl: 'js/build/build.html'
    });

});

app.controller('BuildCtrl', function ($scope, SandwichesFactory, BreadFillings) {
	$scope.bread = BreadFillings.bread;
	console.log('in controller');
	$scope.breadChosen =  function() {
	    SandwichesFactory.addNewSandwich($scope.breadType).then( function(response) {
	        console.log(response);
	    });
	}
});