'use strict';
function jsonp_callback(data) {
// returning from async callbacks is (generally) meaningless
console.log(data.found);
}

// Declare app level module which depends on filters, and services
var coVadis = angular.module('myApp', ['coVadis.services'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
	$routeProvider.when('/page2', {templateUrl: 'views/page2.html'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);