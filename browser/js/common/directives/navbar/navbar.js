'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});