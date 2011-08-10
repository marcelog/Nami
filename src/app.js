/*!
 * Nami application.
 *
 * Copyright 2011 Marcelo Gornstein <marcelog@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var nami = require("./nami.js");

function MyApp(config) {
	var self = this;
	this.config = config;
    this.ami = new nami.Nami(config.amiData);
    this.ami.on('namiInvalidPeer', function () { self.onInvalidPeer() });
    this.ami.on('namiLoginIncorrect', function () { self.onLoginIncorrect() });
    var self = this;
    this.ami.on('namiEvent', function (event) { self.onEvent(event) });
    this.clients = [];
};

MyApp.prototype.onEvent = function (event) {
	console.log(event);
    for (client in this.clients) {
    	this.clients[client].emit('event', event);
    }
};
MyApp.prototype.onInvalidPeer = function (data) {
    console.log('invalid peer: ' + data);
    process.exit();
};
MyApp.prototype.onLoginIncorrect = function (data) {
    console.log('login incorrect');
    process.exit();
};
MyApp.prototype.onWebSocketDisconnect = function () {
	console.log('disconnect');
};
MyApp.prototype.onWebSocketMessage = function (message) {
	console.log(message);
	
};
MyApp.prototype.onWebSocketConnect = function (socket) {
	this.clients.push(socket);
    socket.on('message', this.onWebSocketMessage);
    socket.on('disconnect', this.onWebSocketDisconnect);
};
MyApp.prototype.run = function() {
	var io = require('socket.io').listen(this.config.webSocket.port);
	var self = this;
	io.sockets.on('connection', function (socket) {
		self.onWebSocketConnect(socket);
	});
	this.ami.open();
};

exports.MyApp = MyApp;

