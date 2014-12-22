'use strict';

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

