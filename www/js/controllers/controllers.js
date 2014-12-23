angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, geolocation, localNotification) {


  /*
  try {
    geolocation.getPosition(function(position){
    	alert(position.coords.latitude+" "+position.coords.longitude);
    });
  } catch(e) {
    window.error = e;
    console.error(e);
  }
  */

  try {
    localNotification.localNotification(function(response){
    	alert(response);
    });
  } catch(e) {
    window.error = e;
    console.error(e);
  }
    

  
});
