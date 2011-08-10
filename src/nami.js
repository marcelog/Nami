/*!
 * Nami core class.
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
var net = require('net');
var events = require('events');
var action = require('./message/action.js');
var namiResponse = require('./message/response.js');
var util = require('util');
var namiEvents = require('./message/event.js');
var timer = require('timers');

// Constructor
function Nami(amiData) {
    Nami.super_.call(this);
    this.connected = false;
    this.amiData = amiData;
    this.EOL = "\r\n";
    this.EOM = this.EOL + this.EOL;
    this.welcomeMessage = "Asterisk Call Manager/1.1" + this.EOL;
    this.received = false;
    this.responses = { };
    this.callbacks = { };
};
// Nami inherits from the EventEmitter so Nami itself can throw events.
util.inherits(Nami, events.EventEmitter);

Nami.prototype.onRawEvent = function (event) {
	if (typeof (event.ActionID) !== 'undefined') {
		this.responses[event.ActionID].events.push(event);
	}
	if (
		event.Event.indexOf('Complete') !== -1
		|| ((typeof(event.EventList) !== 'undefined') && event.EventList.indexOf('Complete') != -1)
	) {
		this.callbacks[event.ActionID](this.responses[event.ActionID]);
	} else {
		this.emit('namiEvent', event);
	}
};

Nami.prototype.onRawResponse = function (response) {
	if (response.Message.indexOf('follow') != -1) {
		this.responses[response.ActionID] = response;			
	} else if (typeof (this.callbacks[response.ActionID]) !== 'undefined') {
		this.callbacks[response.ActionID](response);
	}
};

Nami.prototype.onRawMessage = function (buffer) {
	if (buffer.indexOf('Event: ') != -1) {
		var event = new namiEvents.Event(buffer);
		this.emit('namiRawEvent', event);
	} else if (buffer.indexOf('Response: ') != -1) {
		var response = new namiResponse.Response(buffer);
		this.emit('namiRawResponse', response);
	} else {
		console.log("Discarded: |" + buffer + "|");
	}
};

Nami.prototype.onData = function (data) {
    while ((theEOM = data.indexOf(this.EOM)) != -1) {
        this.received = this.received.concat(data.substr(0, theEOM));
        this.emit('namiRawMessage', this.received);
        this.received = "";
        data = data.substr(theEOM + this.EOM.length);
    }
    this.received = data;
};
Nami.prototype.onConnect = function () {
    this.connected = true;
};

Nami.prototype.onWelcomeMessage = function (data) {
    var welcome = data.indexOf(this.welcomeMessage);
	var self = this;
    if (welcome == -1) {
        this.emit('namiInvalidPeer', data);
    } else {
        this.socket.on('data', function (data) {
        	self.onData(data);
        });
        this.send(
        	new action.LoginAction(this.amiData.username, this.amiData.secret),
        	function (response) {
        		if (response.Response != 'Success') {
        			self.emit('namiLoginIncorrect');
        		}
        	}
        );
    }
};
Nami.prototype.open = function () {
    this.socket = new net.Socket();
    var self = this;
    this.socket.on('connect', this.onConnect);
    this.on('namiRawMessage', this.onRawMessage);
    this.on('namiRawResponse', this.onRawResponse);
    this.on('namiRawEvent', this.onRawEvent);
    this.socket.once('data', function (data) {
    	self.onWelcomeMessage(data); 
    });
    this.socket.setEncoding('ascii');
    this.received = "";
    this.socket.connect(this.amiData.port, this.amiData.host);
};

Nami.prototype.send = function (action, callback) {
    this.callbacks[action.ActionID] = callback;
    this.responses[action.ActionID] = "";
    this.socket.write(action.marshall());
};

exports.Nami = Nami;
