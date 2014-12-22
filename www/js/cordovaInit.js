'use strict';
var CordovaInit = function() {

	var onDeviceReady = function() {
		receivedEvent('deviceready');
	};

	var receivedEvent = function() {
		alert('Start event received, bootstrapping application setup.');
		angular.bootstrap($('body'), ['coVadis']);
	};

	this.bindEvents = function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	};

//If cordova is present, wait for it to initialize, otherwise just try to
//bootstrap the application.

if (window.cordova !== undefined) {
	alert('Cordova found, wating for device.');
	this.bindEvents();
} else {
	alert('Cordova not found, booting application');
	receivedEvent('manual');
}

};


$(function() {
	alert('Bootstrapping!');
	new CordovaInit();
});

