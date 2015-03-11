'use strict';
app.factory('CheckUserFactory', function ($http, AuthService) {
    return {
        checkuser: function (postBody) {
	      return AuthService.login(postBody);
          
        }
    };

});
