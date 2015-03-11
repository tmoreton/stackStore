'use strict';
app.factory('SearchFactory', function ($http, $state) {
    return {
        Search: function(searchString){
        	var words = searchString.split(' ')
        	return $http.get('/api/search',{params:{words: words}}).then(function(response){
        		$state.go('addsandwich',{searched:true})
        		return response.data;
        	})
        }
    }
});