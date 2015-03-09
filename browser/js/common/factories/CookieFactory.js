app.factory('CookieFactory', function($kookies){
	return{
		setCookies: function(sandwich){
	 		$kookies.set('sandwiches',sandwich);
	 	},

	 	getCookies: function() {
	 		if ($kookies.get('sandwiches')) {
	 			var sandwiches = $kookies.get('sandwiches');
	 			console.log('in cookie',sandwiches);
	 			return sandwiches;
	 		}
	 		else {
	 			console.log('no kookie :(');
	 			return false;
	 		}
	 	},
	 	removeCookie: function(sandwich){
	 		var sandwiches = $kookies.get("sandwiches")
	 		sandwiches.forEach(function (kookieSandwich, index, array) {
	 			if (sandwich._id == kookieSandwich._id ) {
	 				array.splice(index,1);
	 			}
	 		});
	 		$kookies.set('sandwiches',sandwiches);
	 		return sandwiches;
	 	}
	}
})