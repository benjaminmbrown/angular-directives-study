(function(){

var app = angular.module("directivesModule", []);

	app.directive('helloWorld', function(){

	//this object literal is a directive definition object (DDO)
		return {
			template: "Hey World, wassup!"

		};
	})

}());