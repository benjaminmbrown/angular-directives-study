(function() {

    var app = angular.module('googleMapsModule', []);


    app.directive('googleMap', ['$window',function($window){
        var mapContainer = null,
          status=null;

        return {
            
            template: '<p><span id="status">Looking up geo loc...</span>'+
              '<br /><div id="map"></div>',
            scope: {
              height: '@',
              width: '@'
            },
            link: function(scope, elem, attrs){
              //this allows us to use jqLite with these elements
              status = angular.element(document.getElementById('status'));
              mapContainer = angular.element(document.getElementById('map'));
              console.log('Setting map attributes');
              mapContainer.attr('style', 'height:' + scope.height +
                             'px;width:' + scope.width + 'px');
              console.log("Getting geolocation via html5 geo loc");

              $window.navigator.geolocation.getCurrentPosition(mapLocation, geoError);

              function mapLocation(pos){
                console.log('Getting map location with pos: ',pos);
                status.html = ('Found your location. Long:'+pos.coords.longitude+
                    ' Lat: '+ pos.coords.latitude);

                var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                var options = {
                  zoom:15,
                  center: latlng,
                  mapTypeControl: true,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                console.log('creting new map');
                var map = new google.maps.Map(mapContainer[0],options);

                console.log('Adding map marker');
                var marker = new google.maps.Marker({
                  position: latlng,
                  map: map,
                  title: "Your location"
                });
              }

              function geoError(error){
                status.html('Sorry, failed location lookup'+ error);
              }

            }


        }

    }]);

}());
