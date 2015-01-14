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
        "file": "plugins/com.msopentech.websql/www/wp8/Database.js",
        "id": "com.msopentech.websql.Database"
    },
    {
        "file": "plugins/com.msopentech.websql/www/wp8/SqlTransaction.js",
        "id": "com.msopentech.websql.SqlTransaction"
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.msopentech.websql": "0.0.7",
    "org.apache.cordova.geolocation": "0.3.11",
    "org.apache.cordova.splashscreen": "0.3.5",
    "de.appplant.cordova.plugin.local-notification": "0.7.5",
    "org.apache.cordova.device": "0.2.8"
}
// BOTTOM OF METADATA
});