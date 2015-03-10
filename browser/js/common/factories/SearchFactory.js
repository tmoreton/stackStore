'use strict';
app.factory('SearchFactory', function ($http) {
    return {
        Search: function(searchString){
        	var words = searchString.split(' ')
        	$http.get('/api/search',{params:{words: words}}).then(function(response){
        		console.log("came back to the front")
        		console.log(response)
        		return response.data;
        	})
        }
    }
});