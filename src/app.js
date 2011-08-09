var nami = require("./nami.js");

function MyApp(config) {
	this.config = config;
    this.ami = new nami.Nami(config.amiData);
    this.ami.on('namiInvalidPeer', this.onInvalidPeer);
    var self = this;
    this.ami.on('namiEvent', function (event) { self.onEvent(event) });
    this.clients = [];
}

MyApp.prototype.onEvent = function (event) {
    //console.log('------- Event ------');
    //console.log(event.keys);
    //console.log(event.marshall());
    for (client in this.clients) {
    	console.log(event.keys);
    	this.clients[client].emit('event', event);
    }
    //console.log('---------------');
}
MyApp.prototype.onInvalidPeer = function (data) {
    console.log('invalid peer: ' + data);
    process.exit();
}
MyApp.prototype.onWebSocketDisconnect = function () {
	console.log('disconnect');
}
MyApp.prototype.onWebSocketMessage = function (message) {
	console.log(message);
	
}
MyApp.prototype.onWebSocketConnect = function (socket) {
	this.clients.push(socket);
    socket.on('message', this.onWebSocketMessage);
    socket.on('disconnect', this.onWebSocketDisconnect);
}
MyApp.prototype.run = function() {
	var io = require('socket.io').listen(this.config.webSocket.port);
	var self = this;
	io.sockets.on('connection', function (socket) {
		self.onWebSocketConnect(socket);
	});
	this.ami.open();
}

exports.MyApp = MyApp;

