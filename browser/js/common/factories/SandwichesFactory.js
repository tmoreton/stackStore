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
            return $http.delete('/api/sandwiches/' + id).then(function(response) {
                return response.data;
            });
        },

        newPrice: function(id, price){
            return $http.put('/api/sandwiches/' + id, {params: {price:price}}).then(function(response) {
                return response.data;
            });
        },

        addReview: function(sandwich,review,user) {
            return $http.post('/api/reviews', {params : {description: review, user: user._id, sandwich: sandwich._id}}).then(function(response) {
                console.log(response.data);
            });
        }

    };

});
