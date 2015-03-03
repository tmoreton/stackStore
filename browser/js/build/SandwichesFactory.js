'use strict';
app.factory('SandwichesFactory', function ($http) {

    return {
        getSandwiches: function(sandwich) {

            var sandwichInformation = {};

            return $http.get('/sandwiches', {params: sandwichInformation}).then(function(response) {
                return response.data;
            });
        },

        addNewSandwich: function(sandwich) {
            return $http.post('/sandwiches', sandwich);
        }
    }

});