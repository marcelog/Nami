var net = require('net');
var events = require('events');
var action = require('./message/action.js');
var util = require('util');

function Nami(amiData) {
    Nami.super_.call(this);
    this.connected = false;
    this.loggedIn = false;
    this.amiData = amiData;
    this.EOL = "\r\n";
    this.EOM = this.EOL + this.EOL;
    this.welcomeMessage = "Asterisk Call Manager/1.1" + this.EOL;
}
util.inherits(Nami, events.EventEmitter);

Nami.prototype.onData = function (data) {
    while ((theEOM = data.indexOf(this.me.EOM)) != -1) {
        this.me.received = this.me.received + data.substr(0, theEOM);
        this.me.emit('namiEvent', this.me.received);
        this.me.received = '';
        data = data.substr(theEOM + this.me.EOM.length);
    }
    this.me.received = this.me.received + data;
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
        this.removeListener('data', this.me.onWelcomeMessage);
        this.on('data', this.me.onData);
        this.me.login();
    }
}
Nami.prototype.open = function () {
    this.socket = new net.Socket();
    this.socket.me = this;
    this.socket.on('connect', this.onConnect);
    this.socket.on('data', this.onWelcomeMessage);
    this.socket.setEncoding('ascii');
    this.received = "";
    this.socket.connect(this.amiData.port, this.amiData.host);
}

Nami.prototype.send = function (action) {
    this.socket.write(action.marshall());
}

exports.Nami = Nami;
