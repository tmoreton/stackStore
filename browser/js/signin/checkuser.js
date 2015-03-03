'use strict';
app.factory('checkuser', function ($http) {
    return {
        checkuser: function (postBody) {
          console.log("check user is called")
            return $http.post('/login/', postBody).then(function(response){
                return response.data
            })
        }
    };

});
