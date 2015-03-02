'use strict';
app.factory('AddUser', function ($http) {
  console.log("add user is called")
    return {
        AddUser: function () {
            return $http.post("/signup").then(function(response){
                console.log("responsedata:",response.data)
                return response.data
            })
        }
    };

});
