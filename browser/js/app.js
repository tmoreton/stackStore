'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function ($scope) {

    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'Login/Signup', state: 'signup' },
        { label: 'Build Sandwich', state: 'build'}
    ];
});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});
