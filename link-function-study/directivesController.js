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

app.directive('tableHelperWithNgModel', function(){

        return{
            template: '<div class="tableHelper"></div>',
            retrict: 'E',
            //?ngModel make it optional
            //^ngModel make it on the element
            //^^ngModel make it on parent level
            //?^ngModel make it optional, on the element
            require: 'ngModel',
            scope: {
                columnmap: '=',
            },
            link: function(scope,element,attr, ngModel){
            var headerCols = [],
                tableStart = '<table>',
                tableEnd = '</table>',
                table = '',
                visibleProps = [],
                datasource,
                sortCol = null,
                sortDir = 1;

              //  scope.$watchCollection('datasource', render);

                //watch for ngModel to change. observes attribute ngModel and watches it's value
               

               //Technique 1 - watch for normal attributes
                // attr.$observe('ngModel', function(value){
                //     scope.$watch(value, function(newValue){
                //         render();
                //     })
                // });

                //technique 2
               // scope.$watch(attrs.ngModel, render);

               //Technique 3
               // scope.$watch(function(){
               //  return ngModel.$modelValue;
               // }, function(newValue){
               //  render();
               // })

               //Technique 4 - best when doing ngModel
               ngModel.$render = function(){
                console.log(ngModel.$modelValue)
                render();
               }

                wireEvents();

                function render() {
                 if(ngModel && ngModel.$modelValue.length){
                     scope.datasource = ngModel.$modelValue;
                     console.log('datsource', datasource);
                      table += tableStart;
                      table += renderHeader();
                      table += renderRows() + tableEnd;
                      renderTable();
                  }
              }

              function wireEvents() {
                  element.on('click', function(event) {
                   if (event.srcElement.nodeName === 'TH') {
                       var val = event.srcElement.innerHTML;
                       var col = (scope.columnmap) ? getRawColumnName(val) : val;
                       if (col) sort(col);
                   }
               });
              }

              function sort(col) {
              //See if they clicked on the same header
              //If they did then reverse the sort
              if (sortCol === col) sortDir = sortDir * -1;
              sortCol = col;
              scope.datasource.sort(function(a,b) {
               if (a[col] > b[col]) return 1 * sortDir;
               if (a[col] < b[col]) return -1 * sortDir;
               return 0;
           });
              render();
          }

          function renderHeader() {
             var tr = '<tr>';
         
             for (var prop in scope.datasource[0]) {
                 var val = getColumnName(prop);
                 if (val) {
                       //Track visible properties to make it fast to check them later
                       visibleProps.push(prop);
                       tr += '<th>' + val + '</th>';
                   }
               }
               tr += '</tr>';
               tr = '<thead>' + tr + '</thead>';
               return tr;
           }

           function renderRows() {
             var rows = '';
             for (var i = 0, len = scope.datasource.length; i < len; i++) {
                rows += '<tr>';
                var row = scope.datasource[i];
                for (var prop in row) {
                    if (visibleProps.indexOf(prop) > -1) {
                        rows += '<td>' + row[prop] + '</td>';
                    }
                }
                rows += '</tr>';
            }
            rows = '<tbody>' + rows + '</tbody>';
            return rows;
        }

        function renderTable() {
          table += '<br /><div class="rowCount">' + scope.datasource.length + ' rows</div>';
          element.html(table);
          table = '';
      }

      function getRawColumnName(friendlyCol) {
          var rawCol;
          scope.columnmap.forEach(function(colMap) {
              for (var prop in colMap) {
                  if (colMap[prop] === friendlyCol) {
                   rawCol = prop;
                   break;
               }
           }
           return null;
       });
          return rawCol;
      }

      function filterColumnMap(prop) {
          var val = scope.columnmap.filter(function(map) {
              if (map[prop]) {
                  return true;
              }
              return false;
          });
          return val;
      }

      function getColumnName(prop) {
          if (!scope.columnmap) return prop;
          var val = filterColumnMap(prop);
          if (val && val.length && !val[0].hidden) return val[0][prop];
          else return null;
      }

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
            },
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

                function render() {
                  if (scope.datasource && scope.datasource.length) {
                      table += tableStart;
                      table += renderHeader();
                      table += renderRows() + tableEnd;
                      renderTable();
                  }
              }

              function wireEvents() {
                  element.on('click', function(event) {
                   if (event.srcElement.nodeName === 'TH') {
                       var val = event.srcElement.innerHTML;
                       var col = (scope.columnmap) ? getRawColumnName(val) : val;
                       if (col) sort(col);
                   }
               });
              }

              function sort(col) {
              //See if they clicked on the same header
              //If they did then reverse the sort
              if (sortCol === col) sortDir = sortDir * -1;
              sortCol = col;
              scope.datasource.sort(function(a,b) {
               if (a[col] > b[col]) return 1 * sortDir;
               if (a[col] < b[col]) return -1 * sortDir;
               return 0;
           });
              render();
          }

          function renderHeader() {
             var tr = '<tr>';
             for (var prop in scope.datasource[0]) {
                 var val = getColumnName(prop);
                 if (val) {
                       //Track visible properties to make it fast to check them later
                       visibleProps.push(prop);
                       tr += '<th>' + val + '</th>';
                   }
               }
               tr += '</tr>';
               tr = '<thead>' + tr + '</thead>';
               return tr;
           }

           function renderRows() {
             var rows = '';
             for (var i = 0, len = scope.datasource.length; i < len; i++) {
                rows += '<tr>';
                var row = scope.datasource[i];
                for (var prop in row) {
                    if (visibleProps.indexOf(prop) > -1) {
                        rows += '<td>' + row[prop] + '</td>';
                    }
                }
                rows += '</tr>';
            }
            rows = '<tbody>' + rows + '</tbody>';
            return rows;
        }

        function renderTable() {
          table += '<br /><div class="rowCount">' + scope.datasource.length + ' rows</div>';
          element.html(table);
          table = '';
      }

      function getRawColumnName(friendlyCol) {
          var rawCol;
          scope.columnmap.forEach(function(colMap) {
              for (var prop in colMap) {
                  if (colMap[prop] === friendlyCol) {
                   rawCol = prop;
                   break;
               }
           }
           return null;
       });
          return rawCol;
      }

      function filterColumnMap(prop) {
          var val = scope.columnmap.filter(function(map) {
              if (map[prop]) {
                  return true;
              }
              return false;
          });
          return val;
      }

      function getColumnName(prop) {
          if (!scope.columnmap) return prop;
          var val = filterColumnMap(prop);
          if (val && val.length && !val[0].hidden) return val[0][prop];
          else return null;
      }
  }
}
})



}());
