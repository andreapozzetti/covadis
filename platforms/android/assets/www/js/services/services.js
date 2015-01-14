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

*/

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

	  var dbSize = 5 * 1024 * 1024; // 5MB
	  var db = openDatabase('coVadis', '1.0', 'Park List', dbSize);
      
      db.transaction(function(tx) {


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
            return deferred.resolve();
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

    getAllParking: function(){

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

    getParking: function(idParking){

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
                        maxPrice: results.rows.item(0).maxPrice
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
})



/*

.factory('indexedDB', function($document, $window, $rootScope, $http, $log, $q) {

  var factory;
  var setUp=false;
  var db;
  return factory = {

  init: function() {
    var deferred = $q.defer();

    if(setUp) {
      deferred.resolve(true);
      return deferred.promise;
    }
    
    var openRequest = window.indexedDB.open("coVadis",1);
  
    openRequest.onerror = function(e) {
      console.log("Error opening db");
      console.dir(e);
      deferred.reject(e.toString());
    };

    openRequest.onupgradeneeded = function(e) {
  
      var thisDb = e.target.result;
      var objectStore;
      
      //CREATE TABLE IF NOT EXIST
      if(!thisDb.objectStoreNames.contains("parking")) {
        objectStore = thisDb.createObjectStore("parking", { keyPath: "id", autoIncrement:true });
        //objectStore.createIndex("titlelc", "titlelc", { unique: false });
        //objectStore.createIndex("tags","tags", {unique:false,multiEntry:true});
      }
  
    };

    openRequest.onsuccess = function(e) {
      db = e.target.result;
      
      db.onerror = function(event) {
        // Generic error handler for all errors targeted at this database's
        // requests!
        deferred.reject("Database error: " + event.target.errorCode);
      };
      
      setUp=true;
      deferred.resolve(true);

    
    };  

    return deferred.promise;
  },

  setUp: function() {
    var deferred = $q.defer();
    
    factory.init().then(function() {

      var result;
      var handleResult = function(event) {

        result = event.target.result

      };  
      
      var transaction = db.transaction(["parking"], "readonly");

      var objectStore = transaction.objectStore("parking");
          objectStore.openCursor().onsuccess = handleResult;

      transaction.oncomplete = function(event) {
              deferred.resolve(result);

      }     
    
    });
    return deferred.promise;
  },

  setItems: function() {
    //Should this call init() too? maybe
    var deferred = $q.defer();
    
    factory.setUp().then(function(res) {

    if (res == null)
    {

    var transaction;
    var item;
    var i = 0;

      $http.get('http://www.andreapozzetti.eu/covadis/parkingList.json')
      .success(function(data) {

        transaction = db.transaction(["parking"], "readwrite");
        item = transaction.objectStore("parking");

        putNext(data);

        function putNext(data){
          if (i<data.length) {
            ++i;
            console.log(i);
            item.put({   
                      idParking : data[i-1].idParking,
                      name : data[i-1].name,
                      address : data[i-1].address,
                      latitude : data[i-1].latitude,
                      longitude: data[i-1].longitude,
                      totalParkingNumber : data[i-1].totalParkingNumber,
                      minPrice : data[i-1].minPrice,
                      maxPrice : data[i-1].maxPrice
                    }).onsuccess = putNext(data);
          } 
          else {   // complete
            console.log('populate complete');
              transaction.oncomplete = function(event) {
              factory.getAllParking().then(function(res){
                deferred.resolve(res);
              });
              
              };
          }

        }

      }).error(function(msg) {
        return deferred.resolve(false);
      });
    }
    else{
      
      factory.getAllParking().then(function(res){
        deferred.resolve(res);
      });

    }
    });
    return deferred.promise;
  },

  getAllParking: function() {
    var deferred = $q.defer();
    
    factory.init().then(function() {

      var result = [];

      var handleResult = function(event) {  
        var cursor = event.target.result;
        if (cursor) {
          result.push({
                        idParking:cursor.value.idParking,
                        name:cursor.value.name,
                        address:cursor.value.address,
                        latitude:cursor.value.latitude,
                        longitude:cursor.value.longitude,
                        totalParkingNumber:cursor.value.totalParkingNumber,
                        minPrice:cursor.value.minPrice,
                        maxPrice:cursor.value.maxPrice
                      });
          cursor.continue();
        }
      };  
      
      var transaction = db.transaction(["parking"], "readonly");  
      var objectStore = transaction.objectStore("parking");
            objectStore.openCursor().onsuccess = handleResult;

      transaction.oncomplete = function(event) {
        deferred.resolve(result);
      };
    
    });
    return deferred.promise;
  },

  isSupported: function() {
    return ("indexedDB" in window);   
  },
  
  deleteNote: function(key) {
    var deferred = $q.defer();
    var t = db.transaction(["note"], "readwrite");
    var request = t.objectStore("note").delete(key);
    t.oncomplete = function(event) {
      deferred.resolve();
    };
    return deferred.promise;
  },
  
  getNote: function(key) {

    var deferred = $q.defer();

    var transaction = db.transaction(["note"]);  
    var objectStore = transaction.objectStore("note");  
    var request = objectStore.get(key);  

    request.onsuccess = function(event) {  
      var note = request.result;
      deferred.resolve(note);
    }; 
    
    return deferred.promise;
  },
  
  getNotes: function() {
    var deferred = $q.defer();
    
    init().then(function() {

      var result = [];


      var handleResult = function(event) {  
        var cursor = event.target.result;
        if (cursor) {
          result.push({key:cursor.key, title:cursor.value.title, updated:cursor.value.updated});
          cursor.continue();
        }
      };  
      
      var transaction = db.transaction(["note"], "readonly");  
      var objectStore = transaction.objectStore("note");
            objectStore.openCursor().onsuccess = handleResult;

      transaction.oncomplete = function(event) {
        deferred.resolve(result);
      };
    
    });
    return deferred.promise;
  },
  
  ready: function() {
    return setUp;
  },
  
  saveNote: function(note) {
    //Should this call init() too? maybe
    var deferred = $q.defer();

    if(!note.id) note.id = "";
    
    var titlelc = note.title.toLowerCase();
    
    //handle tags
    var tags = [];
    if(note.tags && note.tags.length) tags = note.tags.split(",");
    
    var t = db.transaction(["note"], "readwrite");
    
        if(note.id === "") {
            t.objectStore("note")
                            .add({title:note.title,body:note.body,updated:new Date().getTime(),titlelc:titlelc,tags:tags});
        } else {
            t.objectStore("note")
                            .put({title:note.title,body:note.body,updated:new Date(),id:Number(note.id),titlelc:titlelc,tags:tags});
        }

    t.oncomplete = function(event) {
      deferred.resolve();
    };

    return deferred.promise;
  },
  
  supportsIDB: function() {
    return "indexedDB" in window; 
  }
  
  }

});


*/





