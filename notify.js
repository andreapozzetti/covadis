var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyDOtsTYuIHXepEnLJ0vN8vUgOued2W39_A');
var registrationIds = [];
 
message.defaults = 0;
// Value the payload data to send...
message.addData('defaults','0');
message.addData('message',"prova2");
message.addData('title','New Notification' );
message.addData('msgcnt','1'); // Shows up in the notification in the status bar
message.addData('sound','beep'); //Sound to play upon notification receipt - put in the www folder in app
message.collapseKey = "demo2";
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
registrationIds.push('APA91bE7fqeLNwhuGE6jaSJ9TPI1maU0o4gz2OP4apejNWHXWMWMogU6me1rjVzsWbIMJ8cEKpkp-aLUa098bLg1QB-uO5Fiz9YgVoTCSHNC7amc9DGDGF5_z0d5C0ETBux_pA_gfgRixKi6VTCmUvjl0VjjOB940g'); 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});