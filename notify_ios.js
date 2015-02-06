var apn = require('apn');
 
var token = "bd0a3191adec4aedce636a1c729dcd79bb9b4dcce7f35222b1c21dcec86b274b";
var token2 = "3470eca1238181aeb00af2783b99a17aa5a24648b2aa950898e4c0c8341a153c";
var device = new apn.Device(token);
 
var notification = new apn.Notification();
notification.expiry = Math.floor(Date.now() / 1000) + 3600;
notification.badge = 1;
notification.alert = "Notifica Push";
notification.sound = "beep-beep.caf";
notification.payload = {'prop': 'special value'};
notification.device = device;
 
var options = {
 gateway: 'gateway.sandbox.push.apple.com',
cert: 'PushChatCert.pem',                
key:  'PushChatKey.pem',  
passphrase: 'Pippolino00'
}
var apnsConnection = new apn.Connection(options);
apnsConnection.pushNotification(notification, device);