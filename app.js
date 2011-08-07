var nami = require("./nami.js");

function MyApp(config) {
    this.ami = new nami.Nami(config.amiData);
    this.ami.on('namiInvalidPeer', this.onInvalidPeer);
    this.ami.on('namiEvent', this.onEvent);
}

MyApp.prototype.onEvent = function (event) {
    console.log('------- Event ------');
    console.log(event);
    console.log(event.marshall());
    console.log('---------------');
}
MyApp.prototype.onInvalidPeer = function (data) {
    console.log('invalid peer: ' + data);
    process.exit();
}
MyApp.prototype.run = function() {
    this.ami.open();
}

exports.MyApp = MyApp;

