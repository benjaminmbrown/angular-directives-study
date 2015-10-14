(function() {

    var app = angular.module('bbUniqueModule', []);

    //assuming you have a data service you're passing in
    app.directive('bbUnique', ['$q', 'dataService' ,function($q, dataService){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope,elem,attrs,ngModel){

                ngModel.$asyncValidators.unique = function(modelValue,viewValue){
                var deffered = $q.defer(),
                    currentValue = modelValue || viewValue,//if model value is not there, default to view
                    key = attrs.bbUniqueKey,
                    property = attrs.bbUniqueProperty;

                    if(key && property){
                        dataService.checkUniqueValue(key,property,currentValue)
                            .then(function(unique){
                                if(unique){
                                    deferred.resolve(); //got a unique val
                                }
                                else{
                                    deferred.reject();
                                }
                            });

                    return deferred.promise;

                    }
                    else{
                        return $q.when(true);
                    }

                }

            }
        }
    }]);

}());
