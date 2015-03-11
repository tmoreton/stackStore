'use strict';
app.directive('sandwichnamevalidator', function(SandwichesFactory, $q){
	return {
		require: 'ngModel',
		restrict: '',
    	link: function(scope, elm, attrs, ctrl) {
    		ctrl.$asyncValidators.sandwichnamevalidator = function(modelValue,viewValue) {
    			var sandwiches;
    			return SandwichesFactory.getSandwiches().then(function (sandwichArr) {
    				sandwiches = sandwichArr;
	    			var names = sandwichArr.map(function(sand) {
	    				return sand.name;
	    			});
   					if (names.indexOf(viewValue) > -1) {
   						console.log("you can't submit. sandwich name must be unique");
   						return $q.reject("Not unqiue");
   					}
   					else {
   						return true;
   					}
    			});
    		};
    	}
	};
});