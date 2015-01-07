angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, getCurrentPosition, localNotificationHasPermission, localNotificationPromptPermission) {


  getCurrentPosition(function(position){
    
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      console.log("ciao");
      alert($scope.latitude);
  });

  localNotificationPromptPermission(function(granted){
      $scope.granted = granted;
      console.log("ciao");
      alert('prompt' + $scope.granted);
  });

  localNotificationHasPermission(function(granted){
      $scope.granted = granted;
      console.log("ciao");
      alert('has' + $scope.granted);
  });

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
