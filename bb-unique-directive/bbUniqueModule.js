(function() {

    var app = angular.module('bbUniqueModule', []);


    app.directive('bbUnique', ['$q',function($q){
       //allows us to cache template before we run link

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope,elem,attrs,ngModel){

            }

         
           

            }
    }]);


}());
