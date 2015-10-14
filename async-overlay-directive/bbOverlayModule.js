(function() {

    var app = angular.module('bbOverlayModule', []);

    app.factory('httpInterceptor',function(){
        return{};
    })

    app.config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push('httpInterceptor');
    }])

    //assuming you have a data service you're passing in
    app.directive('bbOverlay', ['$q','$timeout','$window', 'httpProvider',function($q, $timeout,$window, httpProvider){
        return {
            restrict: 'EA',
            transclude : true,
            scope: {bbOverlayDelay: "@"},
            template: '<div id="overlay-container" class="overlayContainer">' +
                    '<div id="overlay-background" class="overlayBackground"></div>'+
                    '<div id="overlay-content" class="overlayContent" ng-transclude></div></div>';
            link: function(scope,elem,attrs){

                var overlayContainer = null,
                timerPromise = null,
                timerPromiseHide = null,
                queue = [];

                init();


                function init(){
                 setupHttpInterceptor();
                 if(window.jQuery) wirejQueryInterceptor();
                 overlayContainer = elem[0].firstChild;//template location
                }

                function setupHttpInterceptor(){
                    httpInterceptor.request = function(config){
                        processRequest();
                        return config || $q.when(config);
                    }

                     httpInterceptor.response = function(response){
                           processResponse();
                        return response || $q.when(response);
                    }

                     httpInterceptor.responseError = function(rejection){
                        processResponse();
                        return $q.reject(rejection)
                    }
                }

                function wirejQueryInterceptor(){
                    $(document).ajaxStart(function(){
                        processRequest();
                    })

                      $(document).ajaxComplete(function(){
                        processResponse();
                    })

                        $(document).ajaxError(function(){
                        processResponse();
                    })
                }

                function processRequest(){
                    queue.push({});
                    if(queue.length == 1){
                        timerPromise = $timeout(function(){
                            if(queue.length) showOverlay();    
                        }, 
                        scope.bbOverlay ? scope.bbOverlayDelay : 500);
                    }

                }

                function processResponse(){
                    queue.pop();
                    if(queue.legth == 0){
                        
                    }

                }


            }
        }
    }]);

}());
