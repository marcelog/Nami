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
var namiAction = require("./message/action.js");
var util = require("util");
var events = require("events");

function MyApp(resources) {
    MyApp.super_.call(this);
	var self = this;
    this.clients = [];
    this.resources = resources;
    resources.nami.on('namiInvalidPeer', function (data) { self.onInvalidPeer(data); });
    resources.nami.on('namiLoginIncorrect', function () { self.onLoginIncorrect(); });
    resources.nami.on('namiEvent', function (event) { self.onEventToMongo(event); });
    resources.nami.on('namiEvent', function (event) { self.onAnyEvent(event); });
    this.logger = resources.logger.getLogger('Nami.App');
    this.on('Dial', function (event) { self.onDial(event); });
    this.on('VarSet', function (event) { self.onVarSet(event); });
};
util.inherits(MyApp, events.EventEmitter);
MyApp.prototype.onAnyEvent = function (event) {
    if (event.Event === 'DTMF') {
        return;
    }
    this.logger.debug(event);
    this.emit(event.Event, event);
};

MyApp.prototype.saveCall = function (call) {
    call.save(function (err) {
        if (err !== null) {
            this.logger.error("Error saving call: " + err);
        }
    });
}

MyApp.prototype.getCall = function (uniqueId, callback) {
    this.resources.mongo.CallModel.findOne( {uniqueId1: uniqueId}, function(err, obj) {
        if (err !== null) {
            this.logger.error("Error getting call: " + err);
        } else {
            callback(obj);
        }
    });
};

MyApp.prototype.onVarSet = function (event) {
    var self = this;
    if (event.Variable == 'DIALEDTIME') {
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.dialedTime = event.Value;
                self.saveCall(call);
            }
        });
    } else if (event.Variable == 'ANSWEREDTIME') {
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.answeredTime = event.Value;
                self.saveCall(call);
            }
        });
    } else if (event.Variable == 'HANGUPCAUSE') {
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.hangupCause = event.Value;
                call.end = Date.now();
                self.saveCall(call);
            }
        });
    }
};

MyApp.prototype.onDial = function (event) {
    var callEntity = new this.resources.mongo.CallModel();
    var self = this;
    if (event.SubEvent === 'Begin') {
        callEntity.channel1 = event.Channel;
        callEntity.uniqueId1 = event.UniqueID;
        callEntity.channel2 = event.Destination;
        callEntity.uniqueId2 = event.DestUniqueID;
        callEntity.dialString = event.Dialstring;
        callEntity.clidNum = event.CallerIDNum;
        callEntity.clidName = event.CallerIDName;
        this.saveCall(callEntity);
    } else if (event.SubEvent === 'End') {
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.dialStatus = event.DialStatus;
                self.saveCall(call);
            }
        });
    }
}

MyApp.prototype.onEventToMongo = function (event) {
    if (event.Event === 'DTMF') {
        return;
    }
    var eventEntity = new this.resources.mongo.EventModel();
    eventEntity.uniqueId = typeof(event.Uniqueid) !== 'undefined' ? event.Uniqueid : '';
    eventEntity.name = typeof(event.Event) !== 'undefined' ? event.Event : '';
    eventEntity.channel = typeof(event.Channel) !== 'undefined' ? event.Channel : '';
    eventEntity.event = JSON.stringify(event); 
    eventEntity.save(function (err) {
        if (err !== null) {
            this.logger.error("Error saving event: " + err);
        }
    });
};

MyApp.prototype.onInvalidPeer = function (data) {
    this.logger.fatal('invalid peer: ' + util.inspect(data));
    process.exit();
};
MyApp.prototype.onLoginIncorrect = function (data) {
    this.logger.fatal('login incorrect');
    process.exit();
};

exports.MyApp = MyApp;
