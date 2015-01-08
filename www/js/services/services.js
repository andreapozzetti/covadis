
'use strict';
/* Services */
// Simple value service.
angular.module('Service', [])

.factory('geolocation', function ($rootScope) {
  return {
    getPosition: function (onSuccess, onError, options) {
      navigator.geolocation.getCurrentPosition(function () {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      },
      options);
    }
  };
})

.factory('notificationPromptPermission', function ($document, $window, $rootScope){

    return {
        // call to get all nerds
        promptNotification : function() {
            console.log("ciao");
              window.plugin.notification.local.promptForPermission(function (granted) {
                return granted;
              })
        }
    }       

})

.factory('notificationHasPermission', function ($document, $window, $rootScope){

    return {
        // call to get all nerds
        hasPermission : function() {
            console.log("ciao");
              window.plugin.notification.local.hasPermission(function (granted) {
                return granted;
              })
        }
    }       

})

/*

.factory('localNotificationPromptPermission', function(deviceReady, $document, $window, $rootScope){
  return function(done) {
    deviceReady(function(){

      window.plugin.notification.local.promptForPermission(function (granted) {
        $rootScope.$apply(function(){
          done(granted);
        });
      }, function(error){
        $rootScope.$apply(function(){
          throw new Error('Unable to retreive permission');
        });
      });
    
    });
  };
})

.factory('localNotificationHasPermission', function(deviceReady, $document, $window, $rootScope){
  return function(done) {
    deviceReady(function(){

      window.plugin.notification.local.hasPermission(function (granted) {
        $rootScope.$apply(function(){
          done(granted);
        });
      }, function(error){
        $rootScope.$apply(function(){
          throw new Error('Unable to retreive permission');
        });
      });
    
    });
  };
})

.factory('localNotificationSetup', function(deviceReady, $document, $window, $rootScope){
  return function(done) {
    deviceReady(function(){


      var now = new Date().getTime();
      var sixtySeconds = new Date(now + 10*1000);

      window.plugin.notification.local.add({
          id:      1,
          title:   'WARNING',
          message: 'test message'
      });
      
      window.plugin.notification.local.onadd = function (id, state, json) {
        $rootScope.$apply(function(){
          done(id, state, json);
        });
      }, function(error){
        $rootScope.$apply(function(){
          throw new Error('Unable to retreive permission');
        });
      };
    
    
    });
  };
})

.factory('parkInfo', function(deviceReady, $document, $window, $rootScope, $http){

    return {
        // call to get all nerds
        freeParking : function() {
      
            return $http({
                      method  : 'get',
                      url     : 'http://www.andreapozzetti.eu/covadis/date.php',
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                })
              .then(function(result) {
                return result.data;
            });
        }
    }       

})

.factory('parkingList', function(deviceReady, $document, $window, $rootScope, $http, $log, $q) {
  return {
   list : function() {
     var deferred = $q.defer();
     $http.get('http://www.andreapozzetti.eu/covadis/parkingList.json')
       .success(function(data) {
          deferred.resolve(data);
       }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });
     return deferred.promise;
   }
  }
 });

*/

