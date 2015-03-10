app.factory('ReviewsFactory', function($http){
	return{
        getReviews: function(){
            return $http.get('/api/reviews').then(function(response) {
                return response.data;
            });
        }

	};
});
