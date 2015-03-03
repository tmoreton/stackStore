'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.html'
    });

});

app.controller('SignupCtrl', function ($scope, AddUser) {

  $scope.signup = function(){
    console.log($scope.user)
    AddUser.AddUser($scope.user);
  }
});


// app.controller('SignupCtrl', ['$scope', '$http', function($scope, $http){
//   $scope.signup = function(){
//     $http.post('/signup').then
//   }
// }])
