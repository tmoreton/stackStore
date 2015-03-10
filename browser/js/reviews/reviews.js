'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('reviews', {
        url: '/reviews',
        controller: 'ReviewCtrl',
        templateUrl: 'js/reviews/reviews.template.html'
    });

});

app.controller('ReviewCtrl', function ($scope, $state, SandwichesFactory, AuthService) {

    SandwichesFactory.getSandwiches().then (function(sandwiches) {
        $scope.allSandwiches = sandwiches;
        $scope.sandwiches = sandwiches;

    });

    AuthService.getLoggedInUser().then( function (user) {
        $scope.currentUser = user;
    });

    $scope.sandwichSelected = function() {
        $scope.sandwiches = [ $scope.selectedSandwich ];
    };

    $scope.getStarNum = function(review) {
        return new Array(review.stars);
    };

    $scope.showAllReviews = function() {

        $scope.sandwiches = $scope.allSandwiches;
        $scope.selectedSandwich = "";
    };

    $scope.addReview =  function() {
        console.log('addingReview');
        if ($scope.addReviewForm.$valid) {
            SandwichesFactory.addReview($scope.sandwichReviewed,$scope.reviewText, $scope.currentUser);
            console.log('sandwich reviewed', $scope.sandwichReviewed);
            console.log('review text', $scope.reviewText);
        } else {
            console.log('invalid submission');
            $scope.addReviewForm.submitted = true;
        }
    };

});

