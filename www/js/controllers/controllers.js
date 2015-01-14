angular.module('Ctrl', [])
.controller('HomeCtrl', function($scope, $routeParams, $location, database, notificationPromptPermission, notificationHasPermission, notificationSetup) {
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
  */
	
setInterval(function(){
  notificationSetup.showNotification(function(){
      
  });
}, 5000);

  
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
  
  
  
  
  database.ckeckDB().then(function(data) {

	$scope.parkingList = database.getAllParking().then(function(data) {
      $scope.parkingList = data;
      return $scope.parkingList;
	})
	  
  });
  
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

.controller('parkingInfoCtrl', function($scope, $routeParams, $location, database) {

      database.getParking(1).then(function(data) {
      
      $scope.parkingInfo = data;
      
      
      });
   
});
