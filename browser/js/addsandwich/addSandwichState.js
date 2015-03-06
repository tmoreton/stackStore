'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('addsandwich', {
        url: '/addsandwich',
        controller: 'AddSandwichCtrl',
        templateUrl: 'js/addsandwich/addsandwich.template.html'
    });

});

app.controller('AddSandwichCtrl', function ($scope, SandwichesFactory, $kookies) {
	SandwichesFactory.getSandwiches().then( function(sandwiches) {
		$scope.sandwichSelection = sandwiches;
		console.log($scope.sandwichSelection);
	});
});

