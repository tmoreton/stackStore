'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('reviews', {
        url: '/reviews',
        controller: 'ReviewCtrl',
        templateUrl: 'js/reviews/reviews.template.html'
    });

});

app.controller('ReviewCtrl', function ($scope, $state, ReviewsFactory) {
    ReviewsFactory.getReviews().then (function(reviews) {
        $scope.reviews = reviews;
        $scope.reviews.forEach( function(review) {
            review.starArray = [ ];
            for (var i = 1; i<= review.stars; i++) {
                review.starArray.push(i);
            }
        });
    });

});

