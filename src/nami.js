var net = require('net');
var events = require('events');
var action = require('./message/action.js');
var util = require('util');
var namiEvents = require('./message/event.js');
var timer = require('timers');

// Constructor
function Nami(amiData) {
    Nami.super_.call(this);
    this.connected = false;
    this.loggedIn = false;
    this.amiData = amiData;
    this.EOL = "\r\n";
    this.EOM = this.EOL + this.EOL;
    this.welcomeMessage = "Asterisk Call Manager/1.1" + this.EOL;
    this.received = false;
}
// Nami inherits from the EventEmitter so Nami itself can throw events.
util.inherits(Nami, events.EventEmitter);

Nami.prototype.onRawEvent = function (buffer) {
    var event = new namiEvents.Event(buffer);
    this.emit('namiEvent', event);
}

Nami.prototype.onData = function (data) {
    while ((theEOM = data.indexOf(this.EOM)) != -1) {
        this.received = this.received.concat(data.substr(0, theEOM));
        this.emit('namiRawEvent', this.received);
        this.received = "";
        data = data.substr(theEOM + this.EOM.length);
    }
    this.received = data;
}
Nami.prototype.onConnect = function () {
    this.connected = true;
}
Nami.prototype.login = function () {
	var self = this;
    this.socket.on('data', function (data) {
    	self.onData(data);
    });
    this.send(new action.LoginAction(
        this.amiData.username, this.amiData.secret
    ));
}

Nami.prototype.onWelcomeMessage = function (data) {
    var welcome = data.indexOf(this.welcomeMessage);
    if (welcome == -1) {
        this.emit('namiInvalidPeer', data);
    } else {
        this.login();
    }
}
Nami.prototype.open = function () {
    this.socket = new net.Socket();
    var self = this;
    this.socket.on('connect', this.onConnect);
    this.on('namiRawEvent', this.onRawEvent);
    this.socket.once('data', function (data) {
    	self.onWelcomeMessage(data); 
    });
    this.socket.setEncoding('ascii');
    this.received = "";
    this.socket.connect(this.amiData.port, this.amiData.host);
}

Nami.prototype.send = function (action) {
    this.socket.write(action.marshall());
}

exports.Nami = Nami;
