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
	 	}
	}
	// 	setCookies: function() {
	// 		$cookies.put("delicious","chocolatechip")
	// 	}
	// }
})