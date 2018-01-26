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

/**
 * @fileoverview Nami client code.
 *
 * @author Marcelo Gornstein - http://marcelog.github.com
 * Website: http://marcelog.github.com/Nami
 */

var net = require('net');
var events = require('events');
var action = require(__dirname + '/message/action.js');
var namiResponse = require(__dirname + '/message/response.js');
var util = require('util');
var namiEvents = require(__dirname + '/message/event.js');
var timer = require('timers');

/**
 * Nami client.
 * @constructor
 * @param {object} amiData The configuration for ami.
 * @augments EventEmitter
 */
function Nami(amiData) {
    var self = this;
    Nami.super_.call(this);
    this.logLevel = 3; // debug level by default.

    var genericLog = function(minLevel, fun, msg) {
        if(self.logLevel >= minLevel) {
            fun(msg);
        }
    };
    this.logger = amiData.logger || {
        error: function(msg) { genericLog(0, console.error, msg)},
        warn: function(msg) { genericLog(1, console.warn, msg)},
        info: function(msg) { genericLog(2, console.info, msg)},
        debug: function(msg) { genericLog(3, console.log, msg)}
    };
    this.connected = false;
    this.amiData = amiData;
    this.EOL = "\r\n";
    this.EOM = this.EOL + this.EOL;
    this.welcomeMessage = "Asterisk Call Manager/.*" + this.EOL;
    this.received = false;
    this.responses = { };
    this.callbacks = { };
    this.on('namiRawMessage', this.onRawMessage);
    this.on('namiRawResponse', this.onRawResponse);
    this.on('namiRawEvent', this.onRawEvent);
}
// Nami inherits from the EventEmitter so Nami itself can throw events.
util.inherits(Nami, events.EventEmitter);

/**
 * Called when a message arrives and is decoded as an event (namiRawEvent event).
 * This will actually instantiate an Event. If the event has an ActionID,
 * the corresponding response is looked up and will have this event appended.
 * Otherwise, the event "namiEvent" is fired. Also, the event "namiEvent<EventName>"
 * is fired (i.e: on event Dial, namiEventDial will be fired).
 *
 * @see Nami#onRawMessage(String)
 * @param {Event} response An Event message.
 * @returns void
 */
Nami.prototype.onRawEvent = function (event) {
    this.logger.debug('Got event: ' + util.inspect(event));
    if (
        typeof (event.actionid) !== 'undefined'
        && typeof (this.responses[event.actionid]) !== 'undefined'
        && typeof (this.callbacks[event.actionid]) !== 'undefined'
    ) {
        this.responses[event.actionid].events.push(event);
        if (
            event.event.indexOf('Complete') !== -1
                || ((typeof (event.eventlist) !== 'undefined') && event.eventlist.indexOf('Complete') !== -1)
                || event.event.indexOf('DBGetResponse') !== -1
        ) {
            this.callbacks[event.actionid](this.responses[event.actionid]);
            delete this.callbacks[event.actionid];
            delete this.responses[event.actionid];
        }
    } else {
        this.emit('namiEvent', event);
        this.emit('namiEvent' + event.event, event);
    }
};

/**
 * Called when a message arrives and is decoded as a response (namiRawResponse event).
 * This will actually instantiate a Response. If this response has associated events
 * (still to be received), it is buffered.
 * Otherwise, the callback used in send() will be called with the response.
 * @see Nami#onRawMessage(String)
 * @see Nami#send(String)
 * @param {Response} response A Response message.
 * @returns void
 */
Nami.prototype.onRawResponse = function (response) {
    this.logger.debug('Got response: ' + util.inspect(response));
    if (
        (typeof (response.message) !== 'undefined')
            && (response.message.indexOf('follow') !== -1)
    ) {
        this.responses[response.actionid] = response;
    } else if (typeof (this.callbacks[response.actionid]) !== 'undefined') {
        this.callbacks[response.actionid](response);
        delete this.callbacks[response.actionid];
        delete this.responses[response.actionid];
    }
};

/**
 * Called by onData() whenever a raw message has been read.
 * Will fire "namiRawEvent" if the raw message represents an event.
 * Will fire "namiRawResponse" if the raw message represents a response.
 * @see Nami#onData(String)
 * @param {String} buffer The raw message read from server.
 * @returns void
 */
Nami.prototype.onRawMessage = function (buffer) {
    var response, event;
    this.logger.debug('Building raw message: ' + util.inspect(buffer));
    if (buffer.match(/^Event: /) !== null) {
        event = new namiEvents.Event(buffer);
        this.emit('namiRawEvent', event);
    } else if (buffer.match(/^Response: /) !== null) {
        response = new namiResponse.Response(buffer);
        this.emit('namiRawResponse', response);
    } else {
        this.logger.warn("Discarded: |" + buffer + "|");
    }
};

/**
 * Called by node whenever data is available to be read from AMI.
 * Will fire "namiRawMessage" for every complete message read.
 * @param {String} data The data read from server.
 * @see Nami#onRawMessage(String)
 * @returns void
 */
Nami.prototype.onData = function (data) {
    var theEOM = -1, msg;
    this.logger.debug('Got data: ' + util.inspect(data));
    this.received = this.received.concat(data);
    theEOM = -1;
    while ((theEOM = this.received.indexOf(this.EOM)) !== -1) {
        msg = this.received.substr(0, theEOM);
        this.emit('namiRawMessage', msg);
        var startOffset = theEOM + this.EOM.length;
        var skippedEolChars = 0;
        var nextChar = this.received.substr(startOffset + skippedEolChars, 1);
        while (nextChar === "\r" || nextChar === "\n") {
            skippedEolChars++;
            nextChar = this.received.substr(startOffset + skippedEolChars, 1);
        };
        this.logger.debug('Skipped ' + skippedEolChars + ' bytes');
        this.received = this.received.substr(startOffset + skippedEolChars);
    }
};
/**
 * Called when the connection is established to AMI.
 * @returns void
 */
Nami.prototype.onConnect = function () {
    this.connected = true;
};

Nami.prototype.onClosed = function () {
    this.connected = false;
};

/**
 * Called when the first line is received from the server. It will check that
 * the other peer is a valid AMI server. If not valid, the event "namiInvalidPeer"
 * will be fired. If not, a login is tried, and onData() is set as the new handler
 * for incoming data. An anonymous function will handle the login response, firing
 * "namiLoginIncorrect" if the username/password were not correctly validated.
 * On successfull connection, "namiConnected" is emitted.
 * @param {String} data The data read from server.
 * @see Nami#onData(String)
 * @see Login(String, String)
 * @returns void
 */
Nami.prototype.onWelcomeMessage = function (data) {
    var self = this, welcome;
    this.logger.debug('Got welcome message: ' + util.inspect(data));
    var re = new RegExp(this.welcomeMessage, "");
    if (data.match(re) === null) {
        this.emit('namiInvalidPeer', data);
    } else {
        this.socket.on('data', function (data) {
            self.onData(data);
        });
        var login = new action.Login(this.amiData.username, this.amiData.secret)
        if (Array.isArray(this.amiData.events)) {
            login.set('Events', this.amiData.events.join(','))
        }
        this.send(
            login,
            function (response) {
                if (response.response !== 'Success') {
                    self.emit('namiLoginIncorrect');
                } else {
                    self.emit('namiConnected');
                }
            }
        );
    }
};
/**
 * Closes the connection to AMI.
 * @returns void
 */
Nami.prototype.close = function () {
    var self = this;
    this.send(new action.Logoff(), function () { self.logger.info('Logged out'); });
    this.logger.info('Closing connection');
    this.removeAllListeners();
    this.socket.removeAllListeners();
    this.socket.end();
    this.onClosed();
};

/**
 * Opens the connection to AMI.
 * @returns void
 */
Nami.prototype.open = function () {
    this.logger.debug('Opening connection');
    this.received = "";
    this.initializeSocket();
};

/**
 * Creates a new socket and handles connection events.
 * @returns undefined
 */
Nami.prototype.initializeSocket = function () {
    this.logger.debug('Initializing socket');
    var self = this;

    if (this.socket && !this.socket.destroyed) {
        this.socket.removeAllListeners();
        this.socket.end();
    }

    this.socket = new net.Socket();
    this.socket.setEncoding('ascii');

    var baseEvent = 'namiConnection';

    this.socket.on('connect', function() {
        self.logger.debug('Socket connected');
        self.onConnect();
        var event = { event: 'Connect' };
        self.emit(baseEvent + event.event, event);
    });

    // @param {Error} error Fires right before the `close` event
    this.socket.on('error', function (error) {
        self.logger.debug('Socket error: ' + util.inspect(error));
        var event = { event: 'Error', error: error };
        self.emit(baseEvent + event.event, event);
    });

    // @param {Boolean} had_error If the connection closed from an error.
    this.socket.on('close', function (had_error) {
        self.logger.debug('Socket closed');
        self.onClosed();
        var event = { event: 'Close', had_error: had_error };
        self.emit(baseEvent + event.event, event);
    });

    this.socket.on('timeout', function () {
        self.logger.debug('Socket timeout');
        var event = { event: 'Timeout' };
        self.emit(baseEvent + event.event, event);
    });

    this.socket.on('end', function () {
        self.logger.debug('Socket ended');
        var event = { event: 'End' };
        self.emit(baseEvent + event.event, event);
    });

    this.socket.once('data', function (data) {
        self.onWelcomeMessage(data);
    });

    this.socket.connect(this.amiData.port, this.amiData.host);
};

/**
 * Reopens the socket connection to AMI.
 * @returns undefined
 */
Nami.prototype.reopen = function () {
    this.logger.debug('Reopening connection');
    this.initializeSocket();
};

/**
 * Sends an action to AMI.
 *
 * @param {Action} action The action to be sent.
 * @param {function} callback The optional callback to be invoked when the
 * responses arrives.
 *
 * @returns void
 */
Nami.prototype.send = function (action, callback) {
    this.logger.debug('Sending: ' + util.inspect(action));
    this.callbacks[action.ActionID] = callback;
    this.responses[action.ActionID] = "";
    this.socket.write(action.marshall());
};

exports.Nami = Nami;
exports.Actions = action;
exports.Event = namiEvents;
exports.Response = namiResponse;

