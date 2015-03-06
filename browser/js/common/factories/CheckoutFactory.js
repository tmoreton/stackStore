app.factory('CheckoutFactory', function(AuthService, $http){
	return{
		addNewSandwich: function(sandwich) {
            return $http.post('/api/sandwiches', {sandwich: sandwich}).then(function(response){
            	return response.data._id
            });    
        },
        addNewOrder: function(arrOfSandwichIDs, userID){
        	return $http.post('/api/orders', {sandwiches:arrOfSandwichIDs, user: userID}).then(function(response){
        		console.log("frontend done",response)
        	})
        }

	}
});
