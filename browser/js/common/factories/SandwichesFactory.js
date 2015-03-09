'use strict';
app.factory('SandwichesFactory', function ($http) {

    return {
        getSandwiches: function() {

            var sandwichInformation = {};

            return $http.get('/api/sandwiches', {params: sandwichInformation}).then(function(response) {
                return response.data;
            });
        }
        // ,
        // findSandwich: function(sandwichID){
        //     return $http.get('/api/sandwich/', {params: sandwichID}).then(function(response) {
        //         return response.data;
        //     });
        // }

        

        // addToOrder: function(sandwich) {
        //     return $http.post('', )
        // }
    }

});
