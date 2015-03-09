app.factory('CheckoutFactory', function(AuthService, $http, SandwichesFactory){
	return{
		addNewSandwich: function(sandwich) {
            if(sandwich.exists){
                //find object id and return it
                return SandwichesFactory.findSandwichById(sandwich).then(function(sand){
                    console.log("sand", sand);
                    console.log("sandid", sand._id)
                    return sand._id;
                })
            }else{
               return $http.post('/api/sandwiches', {sandwich: sandwich}).then(function(response){
                    return response.data._id;
                });  
            }
        },
        addNewOrder: function(arrOfSandwichIDs, userID){
        	return $http.post('/api/orders', {sandwiches:arrOfSandwichIDs, user: userID}).then(function(response){
        		console.log("frontend done",response)
        	})
        }

	}
});
