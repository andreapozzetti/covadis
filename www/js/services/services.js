
'use strict';
/* Services */
// Simple value service.
angular.module('coVadis.services', []).
value('version', '0.1');
// phonegap ready service - listens to deviceready
coVadis.factory('phonegapReady', function() {
return function (fn) {
var queue = [];
var impl = function () {
queue.push(Array.prototype.slice.call(arguments));
};
document.addEventListener('deviceready', function () {
queue.forEach(function (args) {
fn.apply(this, args);
});
impl = fn;
}, false);
return function () {
return impl.apply(this, arguments);
};
};
});

coVadis.factory('geolocation', function ($rootScope, phonegapReady) {
return {
getCurrentPosition: function (onSuccess, onError, options) {
navigator.geolocation.getCurrentPosition(function () {
var that = this,
args = arguments;
if (onSuccess) {
$rootScope.$apply(function () {
onSuccess.apply(that, args);
});
}
}, function () {
var that = this,
args = arguments;
if (onError) {
$rootScope.$apply(function () {
onError.apply(that, args);
});
}
},
options);
}
};
});