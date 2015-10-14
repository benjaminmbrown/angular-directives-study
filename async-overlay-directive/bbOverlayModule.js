(function() {

    var app = angular.module('bbOverlayModule', []);

    //assuming you have a data service you're passing in
    app.directive('bbOverlay', ['$http', 'dataService' ,function($http, dataService){
        return {
            restrict: 'EA',
            transclude : true,
            scope: {bbOverlayDelay: "@"},
            template: '<div id="overlay-container" class="overlayContainer">' +
                    '<div id="overlay-background" class="overlayBackground"></div>'+
                    '<div id="overlay-content" class="overlayContent" ng-transclude></div></div>';
            link: function(scope,elem,attrs){
                var delay = attrs.bbOverlayDelay;
            }
        }
    }]);

}());
