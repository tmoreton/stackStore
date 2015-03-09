'use strict';
app.factory('SandwichesFactory', function ($http) {

    return {
        getSandwiches: function() {
            var sandwichInformation = {};
            return $http.get('/api/sandwiches', {params: sandwichInformation}).then(function(response) {
                return response.data;
            });
        },

        findSandwichById: function(sandwich){
            var id = sandwich._id;
            return $http.get('/api/sandwiches/'+id).then(function(response) {
                return response.data;
            });
        },
        removeSandwiches: function(id) {
            console.log(id);
            return $http.delete('/api/sandwiches/' + id).then(function(response) {
                return response.data;
            });
        }
    }

});
