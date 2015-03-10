app.factory('CookieFactory', function($kookies){
	return{
		setCookies: function(sandwich){
	 		$kookies.set('sandwiches',sandwich);
	 	},

	 	getCookies: function() {
	 		if ($kookies.get('sandwiches')) {
	 			var sandwiches = $kookies.get('sandwiches');
	 			return sandwiches;
	 		}
	 		else {
	 			return false;
	 		}
	 	},
	 	removeCookie: function(sandwich){
	 		var sandwiches = $kookies.get("sandwiches")
	 		var deleted = false;
	 		sandwiches.forEach(function (kookieSandwich, index, array) {
	 			if (sandwich._id == kookieSandwich._id && !deleted ) {
	 				array.splice(index,1);
	 				deleted = true;
	 			}
	 		});
	 		$kookies.set('sandwiches',sandwiches);
	 		return sandwiches;
	 	},
	 	removeAllCookies: function(){
	 		$kookies.remove('sandwiches');
	 	}
	}
})
