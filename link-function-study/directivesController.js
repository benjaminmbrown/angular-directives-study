(function() {

    var app = angular.module('directivesModule', []);

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

    app.directive('linkDemo', function(){

        return {
            restrict: 'A',
            link: function(scope, elem, attrs){
                elem.on('click', function(){
                    elem.html('You clicked this');
                });

                elem.on('mouseenter', function(){
                    elem.css('background-color', 'yellow');
                });
                elem.on('mouseleave', function(){
                   elem.css('background-color', 'white')                
               });

            }


        }

    })

    app.directive('tableHelper', function(){

        return{
            template: '<div class="tableHelper"></div>',
            retrict: 'E',
            scope: {
                columnap: '=',
                datasource: '='
            }
            link: function(scope, element, attrs){
                var headerCols = [],
                    tableStart = '<table>',
                    tableEnd = '</table>',
                    table = '',
                    visibleProps = [],
                    sortCol = null,
                    sortDir = 1;

                    scope.$watchCollection('datasource', render);

                    wireEvents();

                    function render(){
                        if(scope.datasource && scope.datasource.length){
                            table += tableStart;
                            table += renderHeader();
                            table += renderRows() + tableEnd;
                        }
                    }

                    function wireEvents(){
                        element.on('click', function(event){
                            if(event.srcElement.nodeName === 'TH'){
                                var val= event.srcElement.innerHTML;
                                var col = (scope.columnmap) ? getRawColumnName(val) : val;
                                if(col) sort(col);
                            }
                        });
                    }

                    function sort(col){
                        //sort/ reverse sort
                        if(sortCol === col) sortDir = sortDir * -1;
                        sortCol = col;
                        scope.datasource.sort(function(a,b){
                            if(a[col] > b[col]) return 1 * sortDir;
                            if(a[col] < b[col]) return -1 * sortDir;
                            return 0;
                        });
                        render();
                    }

                

            }
        }
    })



}());
