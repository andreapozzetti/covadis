angular.module('HomeCtrl', [])
.controller('HomeCtrl', function($scope, getCurrentPosition, localNotificationHasPermission, localNotificationPromptPermission, localNotificationSetup, parkInfo, parkingList) {

  

  /*
  getCurrentPosition(function(position){
    
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      console.log("ciao");
      alert($scope.latitude);
  });

  */

  localNotificationPromptPermission(function(granted){
      $scope.grantedPrompt = granted;
      console.log("ciao");
      alert('prompt' + $scope.grantedPrompt);
  });

  localNotificationHasPermission(function(granted){
      $scope.grantedHas = granted;
      console.log("ciao");
      //alert('has' + $scope.grantedHas);
  });

  

      localNotificationSetup(function(id, state, json){
      $scope.id = id;
      $scope.state = state;
      $scope.json = json;
      alert('ciao');
      alert($scope.id);
      alert($scope.state);
      alert($scope.json);
      });



  

  setInterval(function(){

  parkInfo.freeParking().then(function(numberOfFreeParking) {

    $scope.numberOfFreeParking = parseInt(numberOfFreeParking.orario);
   
    if($scope.numberOfFreeParking == 1){

      
      localNotificationSetup(function(id, state, json){
      $scope.id = id;
      $scope.state = state;
      $scope.json = json;
      //alert('ciao');
      //alert($scope.id);
      //alert($scope.state);
      //alert($scope.json);
      });
      

      console.log("ciao");

    };

  });

  }, 5000);
  
  */
  
  $scope.parkingList = parkingList.list().then(function(data) {

      $scope.parkingList = data;
      
        angular.forEach($scope.parkingList, function(obj){
          $scope.number = Math.floor(Math.random() * ((10-2)+1) + 2);
          obj.freeCarPark = $scope.number;
        });

      return $scope.parkingList;

  });


      setInterval(function(){

        $scope.parkingList = angular.forEach($scope.parkingList, function(obj){
          $scope.number = Math.floor(Math.random() * ((10-2)+1) + 2);
          obj.freeCarPark = $scope.number;
        });

        $scope.$apply();

      }, 5000);

  console.log($scope.parkingList);






  /*

  */
  

  /*
  try {
    localNotification.localNotification(function(response){
    	alert(response);
    });
  } catch(e) {
    window.error = e;
    console.error(e);
  }
  */


    

  
});
