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
        if ($scope.addReviewForm.$valid) {
            SandwichesFactory.addReview($scope.sandwichReviewed,$scope.reviewText, $scope.currentUser, $scope.ratings[0].current).then( function(review) {
                $scope.allSandwiches.forEach( function(sandwich) {
                    if (sandwich._id === review.sandwich) {
                        sandwich.reviews.unshift(review);
                    }
                });
                if ($scope.selectedSandwich[0] === $scope.sandwichReviewed) {
                    //selected sandwich is reviewed sandwich so update its reviews
                    $scope.selectedSandwich.reviews.unshift(review);
                }
                $scope.sandwichReviewed= '';
                $scope.reviewText = '';
                $scope.ratings[0].current = 3;
                $scope.addReviewForm.submitted = false;
                return;


            });
            
        } else {
            console.log('invalid submission');
            $scope.addReviewForm.submitted = true;
        }
    };

    $scope.ratings = [{
        current: 3,
        max: 5
    }];

});

