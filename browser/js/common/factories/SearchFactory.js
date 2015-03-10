'use strict';
app.factory('SearchFactory', function ($http, $state) {
    return {
        Search: function(searchString){
        	var words = searchString.split(' ')
        	return $http.get('/api/search',{params:{words: words}}).then(function(response){
        		console.log("came back to the front")
        		console.log(response.data)
        		$state.go('addsandwich',{searched:true})
        		return response.data;
        	})
        }
    }
});