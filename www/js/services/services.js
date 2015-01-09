'use strict';
/* Services */
angular.module('Service', [])

/*

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

.factory('notificationPromptPermission', function ($rootScope) {
  return {
    promptNotification: function (granted) {
      window.plugin.notification.local.promptForPermission(function () {
        var that = this, args = arguments;
          $rootScope.$apply(function () {
            granted.apply(that, args);
          });
      });
    }
  };
})

.factory('notificationHasPermission', function ($rootScope) {
  return {
    hasPermission: function (granted) {
      window.plugin.notification.local.hasPermission(function () {
        var that = this, args = arguments;
          $rootScope.$apply(function () {
            granted.apply(that, args);
          });
      });
    }
  };
})

.factory('notificationSetup', function ($rootScope) {
  return {
    showNotification: function (done) {

      window.plugin.notification.local.add({
          id:      1,
          title:   'WARNING',
          message: 'test message'
      });
    }
  };
})

.factory('notificationOnAdd', function ($rootScope) {
  return function(done) {

      window.plugin.notification.local.onadd = function (id, state, json) {
        $rootScope.$apply(function(){
          done(id, state, json);
        });
      }, function(error){
        $rootScope.$apply(function(){
          throw new Error('Unable to retreive permission');
        });
      };

  };
})

*/

/*

.factory('parkingList', function($document, $window, $rootScope, $http, $log, $q) {
  return {
   list : function() {
     var deferred = $q.defer();
     $http.get('http://www.andreapozzetti.eu/covadis/parkingList.json')
       .success(function(data) {
          console.log(data[0].name);
          deferred.resolve(data);
       }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });
     return deferred.promise;
   }
  }
 })

*/

.factory('database', function($document, $window, $rootScope, $http, $log, $q) {

    var factory;
    return factory = {

    ckeckDB : function() {

      var deferred;
      deferred = $q.defer();

      var db;
      db = window.openDatabase('coVadis', '1.0', 'Park List', 200000);
      
      db.transaction(function(tx) {

        console.log('test');

        tx.executeSql('CREATE TABLE IF NOT EXISTS parking (idParking INTEGER, name TEXT, address TEXT, latitude TEXT, longitude TEXT, totalParkingNumber INTEGER, minPrice INTEGER, maxPrice INTEGER)');

        tx.executeSql("SELECT name FROM parking", [], function(tx, res) {

          if (res.rows.length == 0) {

            return $http.get('http://www.andreapozzetti.eu/covadis/parkingList.json')
            .success(function(data) {
              
              for(var i=0; i<data.length;i++){
                factory.setItem(data[i]);
              }
              
              return deferred.resolve(data);
            }).error(function(msg) {
              return deferred.resolve(false);
            });

          }
          else{
            console.log(res);
          }
        });
      });
      return deferred.promise;
    },

    setItem: function(data) {

      var db;
      db = window.openDatabase('coVadis', '1.0', 'Park List', 200000);
      
      db.transaction(function(tx) {
        
        return tx.executeSql("INSERT INTO parking (idParking, name, address, latitude, longitude, totalParkingNumber, minPrice, maxPrice) VALUES (?,?,?,?,?,?,?,?)", [data.idParking, data.name, data.address, data.latitude, data.longitude, data.totalParkingNumber, data.minPrice, data.maxPrice], function(tx, res) {

          return true;

        });
        

        });

      return false;
    },

    getAllParking:function(){

      var data = [];
      var deferred = $q.defer();
      var db = window.openDatabase('coVadis', '1.0', 'Park List', 200000);

        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM parking', [], function (tx, results) {
              var len = results.rows.length, i;
              for (i = 0; i < len; i++){
                data.push({ idParking : results.rows.item(i).idParking,
                            name : results.rows.item(i).name,
                            address : results.rows.item(i).address,
                            latitude : results.rows.item(i).latitude,
                            longitude: results.rows.item(i).longitude,
                            totalParkingNumber: results.rows.item(i).totalParkingNumber,
                            minPrice: results.rows.item(i).minPrice,
                            maxPrice: results.rows.item(i).maxPrice,
                });
              }
              deferred.resolve(data);
          }, 
          function(e) {
              console.log("ERROR:" + e.message);
          });
        });
      return deferred.promise;
    },

    getParking:function(idParking){

      var data = {};
      var deferred = $q.defer();
      var db = window.openDatabase('coVadis', '1.0', 'Park List', 200000);

        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM parking WHERE idParking = '+ idParking +'', [], function (tx, results) {
              
                data = { 
                        idParking : results.rows.item(0).idParking,
                        name : results.rows.item(0).name,
                        address : results.rows.item(0).address,
                        latitude : results.rows.item(0).latitude,
                        longitude: results.rows.item(0).longitude,
                        totalParkingNumber: results.rows.item(0).totalParkingNumber,
                        minPrice: results.rows.item(0).minPrice,
                        maxPrice: results.rows.item(0).maxPrice,
                }
              
              deferred.resolve(data);
          }, 
          function(e) {
              console.log("ERROR:" + e.message);
          });
        });
      return deferred.promise;
    }

  };
});

/*

app.factory('post_data', [
  '$http', '$q', 'dbcache', function($http, $q, dbcache) {
    var factory;
    return factory = {

      load: function(post_id) {
        var deferred;
        deferred = $q.defer();
        dbcache.getItem('post_data', 'load' + post_id).then(function(data) {
          if (data) {
            return deferred.resolve(jQuery.parseJSON(data));
          } else {

            return $http.get([url_to_server_api]).success(function(data2) {
              dbcache.setItem('post_data', 'load' + post_id, JSON.stringify(data2));
              return deferred.resolve(data2);
            }).error(function(msg) {
              return deferred.resolve(false);
            });
          }
        
        });
        return deferred.promise;
      }
    };
  }
]);

*/








