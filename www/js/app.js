'use strict';

document.addEventListener("deviceready", function() { 
angular.element(document).ready(function () { 
// retrieve the DOM element that had the ng-app attribute
var domElement = document.querySelector("html");
angular.bootstrap(domElement, ["coVadis"]); }); 
}, false);

// public/js/app.js
angular.module('coVadis', ['ngRoute', 'appRoutes', 'HomeCtrl', 'Service']);


// Declare app level module which depends on filters, and services
angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'})
		.when('/page2', {templateUrl: 'views/page2.html'})
		.otherwise({redirectTo: '/'});
}]);

