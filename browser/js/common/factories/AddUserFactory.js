'use strict';
app.factory('AddUserFactory', function ($http) {
    return {
        AddUser: function (postBody) {
          console.log("add user is called")
            return $http.post('/api/signup/', postBody).then(function(response){
                console.log("response", response)
                return response.data
            })
        }
    };

});
