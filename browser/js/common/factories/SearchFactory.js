'use strict';
app.factory('SearchFactory', function ($http) {
    return {
        Search: function(searchString){
        	var words = searchString.split(' ')
        	$http.get('/api/search',{params:{words: words}}).then(function(response){
        		return response.data;
        	})
        }
    }
});