angular.module('Ctrl', [])

/* LANGUAGE CONTROLLER */

.controller('languageCtrl', function($scope, $routeParams, $location, gettextCatalog) {

  $scope.chooseLanguage = function(language){
      localStorage.setItem("language", language);
      gettextCatalog.setCurrentLanguage(language);
      $location.path("/setup");
  
  }
   
})

/* SETUP CONTROLLER */

.controller('setupCtrl', function($scope, $routeParams, $location, parking, bikesharing, gettextCatalog) {

  parking.setupDB().then(function(response) {
    $scope.parking = "50%";
    
    bikesharing.setupDB().then(function(response) {
      $scope.bikesharing = "50%";
      $scope.setupComplete = true;
    });
  
  });

  $scope.home = function(){
    $location.path("/");
  }

   
})

/* HOME CONTROLLER */

.controller('homeCtrl', function($scope, $routeParams, $location, $timeout, geolocation, parking, bikesharing, gettextCatalog, push) {

  $scope.loading = true;

  parking.checkDB().then(function(response) {
    if(!response){
      $location.path("/language");
    }
    else{
      $scope.start();
    }
  
  });

  $scope.start = function(){
    
    geolocation.getPosition(function(position){

        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        localStorage.setItem("userLatitude", $scope.latitude);
        localStorage.setItem("userLongitude", $scope.longitude);

        parking.distance($scope.latitude,$scope.longitude).then(function(response) {
          $scope.loading = false;
          //parking.freeParking().then(function(response) {
          //$scope.loading = false;
          //});
        });

    });

    $scope.parking = function(){
        $location.path("/parking");
    }

    $scope.bikesharing = function(){
        $location.path("/bikesharing");
    }

    $scope.bus = function(){
        $location.path("/bus");
    }

    $scope.settings = function(){
        $location.path("/settings");
    }

    $scope.openShopInComo = function(){
      if(device.platform == "iOS"){
        appAvailability.check('shopincomo://',
          function() {  // Success callback
              window.open('shopincomo://', '_blank');
          },
          function() {  // Error callback
              window.open('itms://itunes.apple.com/it/app/shopincomo/id886182483?mt=8', '_blank')
        });
      }

      if(device.platform == "Android"){
        appAvailability.check('com.shopincomo.shopincomo',
          function() {  // Success callback
              window.open('shopincomo://', '_blank');
          },
          function() {  // Error callback
              window.open('market://details?id=com.shopincomo.shopincomo&hl=it', '_blank')
        });
      }

    }

  }

   
})

/* PARKING LIST CONTROLLER */

.controller('parkingCtrl', function($scope, $routeParams, $location, parking, bikesharing) {

  $scope.parkingList = parking.getAllParking().then(function(data) {
    $scope.parkingList = data;
    return $scope.parkingList;
  });

  $scope.order = 'userDistance';
  $scope.reverse = false;

  $scope.setOrder = function(order,reverse){
    $scope.order = order;
    $scope.reverse = reverse;
  }

  $scope.updateParking = function(){

    parking.getFreeParking().then(function(){
      $scope.parkingList = parking.getAllParking().then(function(data) {
        $scope.parkingList = data;
        return $scope.parkingList;
      });

    })

  }

  $scope.parkingInfo = function(idParking){
      $location.path("/parking/"+idParking);
  }

  $scope.showMap = function(visualization){
      $location.path("/parkingmap");
  }
   
})

/* PARKING MAP CONTROLLER */

.controller('parkingMapCtrl', function($scope, $routeParams, $window, $location, parking, bikesharing) {

  console.log($window.innerHeight);

  $scope.windowHeight = $window.innerHeight-200;

  $scope.markers = [];

  $scope.markers.push({ lat : parseFloat(localStorage.getItem('userLatitude')),
                        lng : parseFloat(localStorage.getItem('userLongitude')),
                        focus: true,
                        label: {
                                 message: "user",
                                 options: {
                                   noHide: true
                                 }
                                }
                      })


  parking.getAllParking().then(function(data) {

    for(var i=0;i<data.length;i++){
      $scope.markers.push({  lat : parseFloat(data[i].latitude),
                                    lng : parseFloat(data[i].longitude),
                                    focus: true,
                                    label: {
                                      message: data[i].name,
                                      options: {
                                        noHide: true
                                      }
                                    }
                                  });

    }


   console.log($scope.markers);
  
  });



  angular.extend($scope, {
                          como: {
                              autoDiscover: true,
                              zoom: 14
                          },
                          tileLayer: {
                            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            opacity: 0.9,
                            detectRetina: true,
                            reuseTiles: true 
                          }
  });

  $scope.showList = function(visualization){

      $location.path("/parking/");

  }
   
})

/* PARKING CONTROLLER */

.controller('parkingInfoCtrl', function($scope, $routeParams, $location, parking, bikesharing, androidNavigate, push) {

  $scope.parkingInfo = parking.getParking($routeParams.idParking).then(function(data) {
    $scope.parkingInfo = data;
    return $scope.parkingInfo;
  });

  $scope.navigate = function(idParking,parkingName,parkingLatitude,parkingLongitude){

    localStorage.setItem("idParking", idParking);
    localStorage.setItem("parkingName", parkingName);

    $scope.coordinates = ""+parseFloat(parkingLatitude).toFixed(5)+","+parseFloat(parkingLongitude).toFixed(5)+"";
    
      var pushNotification = window.plugins.pushNotification;

      switch (device.platform) {
          case ("Android" || "android"):
              pushNotification.register(successHandler, errorHandler, {"senderID":"192576884107","ecb":"onNotification"});
              androidNavigate.startNavigator($scope.coordinates, function(){});
              break;
          case "iOS":
              pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
              window.location.href = "maps:q="+$scope.coordinates+"";
              break;
          case "windows":
              console.log("windows phone");
              break;
      } 

      // Android
      window.onNotification = function(e) {

        switch( e.event ) {
            case 'registered':
              if ( e.regid.length > 0 ) {
                var regId = e.regid;
                var Userdevice = device.platform;
                var idParking = localStorage.getItem('idParking');
                var parkingName = localStorage.getItem('parkingName');

                push.saveregId(regId, Userdevice, idParking, parkingName).then(function(response){
                  var res = JSON.stringify(response);
                })
              }
              break;
            
            case 'message':
              if (e.foreground) {  
                var my_media = new Media(e.sound);
                my_media.play();
                navigator.notification.alert(e.payload.message);
              }
              break;
            case 'error':
              console.log("error");
              break;
        }
      }

      // iOS
      window.onNotificationAPN = function(e) {
        if (e.alert) {
          // showing an alert
          navigator.notification.alert(e.alert);
        }          
        if (e.sound) {
          var snd = new Media(e.sound);
          snd.play();
        }     
        if (e.badge) {
          pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
      }

      function tokenHandler (token) {
        
        var Userdevice = device.platform;
        var idParking = localStorage.getItem('idParking');
        var parkingName = localStorage.getItem('parkingName');
 
        push.saveregId(token, Userdevice, idParking, parkingName).then(function(response){
          var res = JSON.stringify(response);
        })

      }

      function successHandler (result) {
        console.log(result);
      }
                
      function errorHandler (error) {
        console.log(error);
      }

  }
   
})

/* test CONTROLLER */

.controller('testCtrl', function($scope, $routeParams, $location, database, gettextCatalog) {
//.controller('HomeCtrl', function($scope, geolocation, notificationPromptPermission, notificationHasPermission, notificationSetup, notificationOnAdd) {

  /*
  geolocation.getPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      alert($scope.latitude);
  });
  
  */
  /*
  notificationPromptPermission.promptNotification(function(granted){
      $scope.grantedPer = granted;
  });
  */
  
  /*
  notificationHasPermission.hasPermission(function(granted){
	  $scope.grantedHas = granted;
  });


setInterval(function(){
  notificationSetup.showNotification(function(){
      
  });
}, 5000);

  */

  // Language switcher
    $scope.languages = {
        current: gettextCatalog.currentLanguage,
        available: {
        'it': 'Ita',
        'en': 'Eng'
        }
    };

    $scope.$watch('languages.current', function (lang) {
        if (!lang) {
            return;
        }

        gettextCatalog.setCurrentLanguage(lang);
    });
	

  
  /*

  notificationOnAdd(function(id, state, json){

      $scope.id = id;
      $scope.state = state;
      $scope.json = json;
      
  });

  */


 
  /*

  $scope.parkingList = parkingList.list().then(function(data) {

      $scope.parkingList = data;
      
        angular.forEach($scope.parkingList, function(obj){
          $scope.number = Math.floor(Math.random() * ((10-2)+1) + 2);
          obj.freeCarPark = $scope.number;
        });

      return $scope.parkingList;

  });

  */

  /* --------------------------------------------------------------------------------------- */

  /* WEB SQL*/
  
  
  /*
  
  database.ckeckDB().then(function(data) {

	$scope.parkingList = database.getAllParking().then(function(data) {
      $scope.parkingList = data;
      return $scope.parkingList;
	})
	  
  });

*/
  
  /*
;
  


  $scope.parkingInfo = function(idParking){
      $location.path("/parking/"+idParking);
      

  }
  
  
*/

  /* INDEX DB */

  /*
  
  $scope.parkingList = indexedDB.setItems().then(function(data) {

      console.log(data);
      $scope.parkingList = data;
      return $scope.parkingList;

  });


  */


  /* --------------------------------------------------------------------------------------- */
  


  /*


      setInterval(function(){

        $scope.parkingList = angular.forEach($scope.parkingList, function(obj){
          $scope.number = Math.floor(Math.random() * ((10-2)+1) + 2);
          obj.freeCarPark = $scope.number;
        });

        $scope.$apply();

      }, 5000);

  console.log($scope.parkingList);
  
  */  
})

