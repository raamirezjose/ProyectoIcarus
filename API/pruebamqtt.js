var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://159.89.33.196');
client.on('connect', function () {
setInterval(function() {
client.publish('myTopic', 'Hello Matius');
console.log('Message Sent');
}, 5000);
});
