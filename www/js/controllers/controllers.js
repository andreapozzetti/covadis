angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope) {

    geolocation.getCurrentPosition().then(function(data) {
       //this will execute when the 
       //AJAX call completes.
       $scope.location = data;
       alert($scope.location);
    });
  
});