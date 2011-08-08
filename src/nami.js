var net = require('net');
var events = require('events');
var action = require('./message/action.js');
var util = require('util');
var namiEvents = require('./message/event.js');
var timer = require('timers');

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
util.inherits(Nami, events.EventEmitter);

Nami.prototype.onRawEvent = function (buffer) {
    var event = new namiEvents.Event(buffer);
    this.emit('namiEvent', event);
}

// in net.Socket scope
Nami.prototype.onData = function (data) {
    while ((theEOM = data.indexOf(this.me.EOM)) != -1) {
        this.me.received = this.me.received.concat(data.substr(0, theEOM));
console.log("|" + this.me.received + "|\n");
        this.me.emit('namiRawEvent', this.me.received);
        this.me.received = "";
        data = data.substr(theEOM + this.me.EOM.length);
    }
    this.me.received = data;
}
Nami.prototype.onConnect = function () {
    this.connected = true;
}
Nami.prototype.login = function () {
    this.socket.on('data', this.onData);
    this.send(new action.LoginAction(
        this.amiData.username, this.amiData.secret
    ));
}

Nami.prototype.onWelcomeMessage = function (data) {
    var welcome = data.indexOf(this.me.welcomeMessage);
    if (welcome == -1) {
        this.me.emit('namiInvalidPeer', data);
    } else {
        this.me.login();
    }
}
Nami.prototype.open = function () {
    this.socket = new net.Socket();
    this.socket.on('connect', this.onConnect);
    this.on('namiRawEvent', this.onRawEvent);
    this.socket.once('data', this.onWelcomeMessage);
    this.socket.setEncoding('ascii');
    this.received = "";
    this.socket.me = this;
    this.socket.connect(this.amiData.port, this.amiData.host);
}

Nami.prototype.send = function (action) {
    this.socket.write(action.marshall());
}

exports.Nami = Nami;
