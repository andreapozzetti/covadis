angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, geolocation) {


  try {
    geolocation.getPosition(function(position){
    	alert(position.coords.latitude+" "+position.coords.longitude);
    });
  } catch(e) {
    window.error = e;
    console.error(e);
  }
    

  
});
