(function() {

    var app = angular.module('delayBindModule', []);

    var injectParams = ['$scope'];

    var CustomersController = function ($scope) {
        var counter = 0;
        $scope.tasks = [{ title: 'Task 1' }];
        $scope.customer = {
            name: 'David',
            street: '1234 Anywhere St.'
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
    };

    CustomersController.$inject = injectParams;

    app.controller('CustomersController', CustomersController);


    app.directive('delayBind', ['$interpolate',function($interpolate){
       //allows us to cache template before we run link

        return {
            restrict: 'A',
            compile: function(tElem, tAttrs){
              console.log("In compile");
              var interpolateFunc = $interpolate(tAttrs.delayBind); //caches the binding function
              tAttrs.$set('delayBind', null);//clear out bindings so when link function hits there is no binding

              return {
                pre: function(scope, elem, attrs){
                  console.log("in delayBind pre " + elem[0].tagName);
                },
                post: function(scope, elem,attrs){//same as link function
                 console.log("in delayBind post " + elem[0].tagName);
                 elem.on(attrs.trigger, function(event){
                  //update the binding when mouseenter (or other trigger event) occurs
                    var attr = attrs.attribute,
                      val = interpolateFunc(scope);

                      if(attr && !elem.attr(attr)){//if it's already been moused over once
                        elem.attr(attr, val);
                      }

                 })
                }
              };

            }
           

            }
    }]);


}());
