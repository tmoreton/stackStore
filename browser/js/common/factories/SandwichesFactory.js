'use strict';
app.factory('SandwichesFactory', function ($http) {

    return {
        getSandwiches: function() {

            var sandwichInformation = {};

            return $http.get('/api/sandwiches', {params: sandwichInformation}).then(function(response) {
                return response.data;
            });
        },

        removeSandwiches: function(id) {
            return $http.delete('/api/sandwiches/' + id).then(function(response) {
                return response.data;
            });
        },

        updatePrice: function(id){
            return $http.post('/api/sandwiches/' + id);
        }

    }

});
