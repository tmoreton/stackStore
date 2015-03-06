'use strict';
app.factory('checkuser', function ($http, AuthService) {
    return {
        checkuser: function (postBody) {
          console.log("check user is called");
	      return AuthService.login(postBody);
          
        }
    };

});
