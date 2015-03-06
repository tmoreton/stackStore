'use strict';
app.factory('SandwichesFactory', function ($http) {

    return {
        getSandwiches: function(sandwich) {

            var sandwichInformation = {};

            return $http.get('/api/sandwiches', {params: sandwichInformation}).then(function(response) {
                return response.data;
            });
        }

        

        // addToOrder: function(sandwich) {
        //     return $http.post('', )
        // }
    }

});
