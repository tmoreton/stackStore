'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies', 'ngKookies','ui.bootstrap', 'angular.filter', 'stripe'])
.config(['$kookiesProvider',
    function ($kookiesProvider) {
        $kookiesProvider.config.json = true;
        Stripe.setPublishableKey('pk_test_ZWDcXPDv6RKpf1iuy5KCxgty');
    }
]);

app.controller('MainController', function ($scope, $rootScope, AuthService, AUTH_EVENTS, $kookies, SearchFactory) {

    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        // { label: 'Login/Signup', state: 'signup' },
        { label: 'Add Sandwich from Menu', state: 'addsandwich'},
        { label: 'Make Your Own Masterpiece', state: 'createsandwich'},
        { label: 'Reviews', state: 'reviews'}

    ];
    $scope.justOrdered = null;
    $rootScope.$on('$stateChangeStart', function( event, toState, toParams, fromState, fromParams ) {
        if (toState.name == 'success' && fromState.name == 'checkout') {
            $scope.justOrdered = true;
        }
        if (fromState.name === 'home') {
            $scope.LogOutSuccess = null; 
        } if (fromState.name == 'success') {
            $scope.justOrdered = false;
        }
    });

    $scope.userLogout = function() {
        $kookies.remove("sandwiches");
        $scope.user = null;
        $scope.userLoggedIn = false;
        return AuthService.logout();
    };

    $scope.userLogin = function() {
        return AuthService.login();
    };

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
        $scope.LogOutSuccess = "You've successfully logged out";
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
        AuthService.getLoggedInUser().then(function(user) {
            $scope.user = user;
            if(user) {
                $scope.userLoggedIn = true;
            } else {
                $scope.userLoggedIn = false;
            }
        });

    });
    
    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
        if(user) {
            $scope.userLoggedIn = true;
        } else {
            $scope.userLoggedIn = false;
        }
    });

    $scope.search = function(string){
        SearchFactory.Search(string).then(function(results){
            $scope.searchResults = results;
        });
    };

});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');

});
