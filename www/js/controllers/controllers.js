angular.module('HomeCtrl', [])
.controller('HomeCtrl', function($scope, geolocation, notificationPromptPermission, notificationHasPermission, notificationSetup, notificationOnAdd) {

  


  
  geolocation.getPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      alert($scope.latitude);
  });
  


  
  notificationPromptPermission.promptNotification(function(granted){
      alert("ciao");
      $scope.grantedPrompt = granted;
      alert('prompt' + $scope.grantedPrompt);
  });
  
  
  notificationHasPermission.hasPermission(function(granted){
      $scope.grantedHas = granted;
      alert('has' + $scope.grantedHas);
  });

  notificationSetup.showNotification(function(){
      
  });

  notificationOnAdd.onAdd(function(id, state, json){

      $scope.id = id;
      $scope.state = state;
      $scope.json = json;
      alert('ciao');
      alert($scope.id);
      alert($scope.state);
      alert($scope.json);
      
  });

  /*

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


*/



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
