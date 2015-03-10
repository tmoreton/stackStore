'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('reviews', {
        url: '/reviews',
        controller: 'ReviewCtrl',
        templateUrl: 'js/reviews/reviews.template.html'
    });

});

app.controller('ReviewCtrl', function ($scope, $state, SandwichesFactory) {

    SandwichesFactory.getSandwiches().then (function(sandwiches) {
        $scope.sandwiches = sandwiches;
    });

    $scope.getStarNum = function(review) {
        return new Array(review.stars);
    };

});

