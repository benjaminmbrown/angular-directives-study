(function(){

var app = angular.module("sharedScopeModule", []);

	app.controller("Controller", ['$scope', function($scope){
		var counter=123;
		$scope.customer = {
			name: "Benjamin",
			street: "1 N Franklin"
		};

		 $scope.customers = [
            {
                name: 'David',
                street: '1234 Anywhere St.',
                age: 25,
                url: 'index.html'
            },
            {
                name: 'Tina',
                street: '1800 Crest St.',
                age: 35,
                url: 'index.html'
            },
            {
                name: 'Michelle',
                street: '890 Main St.',
                age: 29,
                url: 'index.html'
            },
            {
                name: 'John',
                street: '444 Cedar St.',
                age: 18,
                url: 'index.html'
            }
        ];

        $scope.addCustomer = function (name) {
            console.log(name);
            counter++;
            $scope.customers.push({
                name: (name) ? name : 'New Customer' + counter,
                street: counter + ' Cedar Point St.',
                age: counter
            });
        };

        $scope.changeData = function () {
            counter++;
            $scope.customer = {
                name: 'James',
                street: counter + ' Cedar Point St.'
            };
        };


	}])

	app.directive('sharedScope', function(){

	//this object literal is a directive definition object (DDO)
		return {
			template: "Name: {{customer.name}} Street: {{customer.street}}"

		};
	})

	app.directive('isolateScope', function(){

	//this object literal is a directive definition object (DDO)
		return {
			scope: { name : '@'},
			template: "Name: {{name}} Street: {{customer.street}}"

		};
	})

	app.directive('isolateScopeWithString', function(){

	//this object literal is a directive definition object (DDO)
		return {
			scope: { name : '@'},
			template: "Name: {{name}}"

		};
	})


	app.directive('isolateScopeWithObject', function(){

	//this object literal is a directive definition object (DDO)
		return {
			scope: { datasource : '='},
			template: 'Name: {{datasource.name}} Street: {{datasource.street}}'+
			'<br/><button ng-click="datasource.name=\'Fred\'">'+'Change</button>'

		};
	})

	app.directive('isolateScopeWithEvent', function(){

	//this object literal is a directive definition object (DDO)
		return {
			scope: { 
				datasource : '=',
				action: '&'
					},
			template: 'Name: {{datasource.name}} Street: {{datasource.street}}'+
			'<br/><button ng-click="action()">'+'Change Data</button>'

		};
	})

}());