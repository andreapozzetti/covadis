cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.msopentech.websql/www/WebSQL.js",
        "id": "com.msopentech.websql.WebSQL",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/com.msopentech.websql/www/windows/Database.js",
        "id": "com.msopentech.websql.Database"
    },
    {
        "file": "plugins/com.msopentech.websql/www/windows/SqlTransaction.js",
        "id": "com.msopentech.websql.SqlTransaction"
    },
    {
        "file": "plugins/com.msopentech.websql/src/windows/WebSqlProxy.js",
        "id": "com.msopentech.websql.WebSqlProxy",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/src/windows/GeolocationProxy.js",
        "id": "org.apache.cordova.geolocation.GeolocationProxy",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
        "id": "org.apache.cordova.geolocation.Coordinates",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
        "id": "org.apache.cordova.geolocation.PositionError",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
        "id": "org.apache.cordova.geolocation.Position",
        "clobbers": [
            "Position"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
        "id": "org.apache.cordova.geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/windows8/SplashScreenProxy.js",
        "id": "org.apache.cordova.splashscreen.SplashScreenProxy",
        "merges": [
            ""
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/src/windows8/DeviceProxy.js",
        "id": "org.apache.cordova.device.DeviceProxy",
        "merges": [
            ""
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "plugin.notification.local"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.msopentech.websql": "0.0.7",
    "org.apache.cordova.geolocation": "0.3.11",
    "org.apache.cordova.splashscreen": "0.3.5",
    "org.apache.cordova.device": "0.2.8",
    "de.appplant.cordova.plugin.local-notification": "0.7.5"
}
// BOTTOM OF METADATA
});