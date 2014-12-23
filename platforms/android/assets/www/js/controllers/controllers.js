angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, getCurrentPosition, localNotification) {


  getCurrentPosition(function(position){
    
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      console.log("ciao");
      console.log($scope.latitude);
  });

  localNotification(function(granted){
    
      $scope.granted = granted;
      console.log("ciao");
      console.log($scope.granted);
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
