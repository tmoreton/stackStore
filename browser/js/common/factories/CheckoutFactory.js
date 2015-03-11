app.factory('CheckoutFactory', function(AuthService, $http, SandwichesFactory, $state, $kookies){
	return{
		addNewSandwich: function(sandwich) {
            if(sandwich.exists){
                //find object id and return it
                return SandwichesFactory.findSandwichById(sandwich).then(function(sand){
                    return sand._id;
                })
            }else{
               return $http.post('/api/sandwiches', {sandwich: sandwich}).then(function(response){
                    return response.data._id;
                });  
            }
        },
        addNewOrder: function(arrOfSandwichIDs, userID){
        	return $http.post('/api/orders', {sandwiches: arrOfSandwichIDs, user: userID})
        }

	}
});
