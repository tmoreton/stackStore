'use strict';
app.factory('SandwichesFactory', function ($http) {

    return {
        getSandwiches: function() {

            var sandwichInformation = {};

            return $http.get('/api/sandwiches', {params: sandwichInformation}).then(function(response) {
                return response.data;
            });
        },

        addNewSandwich: function(sandwich) {
                return $http.post('/api/sandwiches', {sandwich: sandwich}).then(function(response){
                }); 
           
        },

        // addToOrder: function(sandwich) {
        //     return $http.post('', )
        // }
    }

});
