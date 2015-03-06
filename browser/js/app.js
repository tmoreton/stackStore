'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies', 'ngKookies'])
.config(['$kookiesProvider', 
    function ($kookiesProvider) {
        $kookiesProvider.config.json = true;
    }
]);

app.controller('MainController', function ($scope, $rootScope, AuthService, AUTH_EVENTS) {

    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'Login/Signup', state: 'signup' },
        { label: 'Build Sandwich', state: 'build'}
    ];

    $scope.userLogout = function() {
        $scope.user = null;
        $scope.userLoggedIn = false;
        return AuthService.logout()
    };

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
        $scope.LogOutSuccess = "You've successfully logged out";
    })

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
        AuthService.getLoggedInUser().then(function(user) {
            $scope.user = user;
            if(user) {
                $scope.userLoggedIn = true;
            } else {
                $scope.userLoggedIn = false;
            }
        });

    })

     AuthService.getLoggedInUser().then(function(user) {
                $scope.user = user;
                console.log(user);
                if(user) {
                    $scope.userLoggedIn = true;
                } else {
                    $scope.userLoggedIn = false;
                }
            });


});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');

    // .module('myApp', ['angularPayments']).config(function($window) {
    //     $window.Stripe.setPublishableKey('pk_test_OxISGD7GxGhZCOofus3QFoW8');
    // });
    // angular.config(function() {
    //     window.Stripe.setPublishableKey('pk_test_OxISGD7GxGhZCOofus3QFoW8');
    // })
});
