angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, getCurrentPosition, localNotificationHasPermission, localNotificationPromptPermission, localNotificationSetup, parkInfo) {

  /*

  getCurrentPosition(function(position){
    
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      console.log("ciao");
      alert($scope.latitude);
  });

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



  */

  setTimeout(function(){

  parkInfo.freeParking().then(function(numberOfFreeParking) {

    if(numberOfFreeParking.orario == 1){

      localNotificationSetup(function(id, state, json){
      $scope.id = id;
      $scope.state = state;
      $scope.json = json;
      alert('ciao');
      alert($scope.id);
      alert($scope.state);
      alert($scope.json);
      });

    };

  });

  }, 10000);



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
