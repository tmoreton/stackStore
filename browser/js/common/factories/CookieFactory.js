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
	 		console.log("this is the sandwich we are trying to remove", sandwich)
	 		var sandwiches = $kookies.get("sandwiches")
	 		sandwiches.splice(sandwiches.indexOf(sandwich))
	 		$kookies.set('sandwiches',sandwiches);
	 		console.log("these are our sandwiches",$kookies.get("sandwiches"))
	 		return sandwiches
	 	}
	}
	// 	setCookies: function() {
	// 		$cookies.put("delicious","chocolatechip")
	// 	}
	// }
})