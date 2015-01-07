
'use strict';
/* Services */
// Simple value service.
angular.module('Service', [])
// phonegap ready service - listens to deviceready
.factory('deviceReady', function(){
  return function(done) {
    if (typeof window.cordova === 'object') {
      document.addEventListener('deviceready', function () {
        done();
      }, false);
    } else {
      done();
    }
  };
})

.factory('getCurrentPosition', function(deviceReady, $document, $window, $rootScope){
  return function(done) {
    deviceReady(function(){
      navigator.geolocation.getCurrentPosition(function(position){
        $rootScope.$apply(function(){
          done(position);
        });
      }, function(error){
        $rootScope.$apply(function(){
          throw new Error('Unable to retreive position');
        });
      });
    });
  };
})

.factory('localNotification', function(deviceReady, $document, $window, $rootScope){
  return function(done) {
    deviceReady(function(){

      window.plugin.notification.local.hasPermission(function (granted) {
        $rootScope.$apply(function(){
          alert('permission ' + granted);
          done(granted);
        });
      }, function(error){
        $rootScope.$apply(function(){
          throw new Error('Unable to retreive permission');
        });
      });
    
    });
  };
});