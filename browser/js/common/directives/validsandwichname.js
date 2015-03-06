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
	    			console.log('names', names);
	    			console.log('viewValue',viewValue);
   					if (names.indexOf(viewValue) > -1) {
   						console.log("you can't submit...");
   						return $q.reject("Not unqiue");
   					}
   					else {
   						console.log('This is unique');
   						return true;
   					}
    			});
    		} 
    	}
	}
});