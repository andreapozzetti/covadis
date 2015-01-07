angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, getCurrentPosition, localNotificationHasPermission, localNotificationPromptPermission) {


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
      alert('has' + $scope.grantedHas);
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
