/*!
 * Will save call statuses to mongo.
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
var events = require("events");

function CallListener(resources) {
    CallListener.super_.call(this);
	var self = this;
    this.resources = resources;
    this.logger = require('log4js').getLogger('Nami.Mongo.Call');
    this.logger.debug('Init');
    this.mongo = this.resources.mongo;
    this.resources.nami.on('namiEvent', function (event) {
        self.onAnyEvent(event);
    });
    this.on('Dial', function (event) { self.onDial(event); });
    this.on('VarSet', function (event) { self.onVarSet(event); });
};
util.inherits(CallListener, events.EventEmitter);

CallListener.prototype.onAnyEvent = function (event) {
    if (event.Event === 'DTMF') {
        return;
    }
    this.emit(event.Event, event);
};

CallListener.prototype.saveCall = function (call) {
    call.save(function (err) {
        if (err !== null) {
            this.logger.error("Error saving call: " + err);
        }
    });
}

CallListener.prototype.getCall = function (uniqueId, callback) {
    this.mongo.CallModel.findOne( {uniqueId1: uniqueId}, function(err, obj) {
        if (err !== null) {
            this.logger.error("Error getting call: " + err);
        } else {
            callback(obj);
        }
    });
};

CallListener.prototype.onVarSet = function (event) {
    var self = this;
    if (event.Variable == 'DIALEDTIME') {
        this.logger.debug('Set DIALEDTIME: ' + util.inspect(event));
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.dialedTime = event.Value;
                self.saveCall(call);
            }
        });
    } else if (event.Variable == 'ANSWEREDTIME') {
        this.logger.debug('Set ANSWEREDTIME: ' + util.inspect(event));
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.answeredTime = event.Value;
                self.saveCall(call);
            }
        });
    } else if (event.Variable == 'HANGUPCAUSE') {
        this.logger.debug('Set HANGUPCAUSE: ' + util.inspect(event));
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.hangupCause = event.Value;
                call.end = Date.now();
                self.saveCall(call);
            }
        });
    }
};

CallListener.prototype.onDial = function (event) {
    var callEntity = new this.mongo.CallModel();
    var self = this;
    if (event.SubEvent === 'Begin') {
        this.logger.debug('Begin Call: ' + util.inspect(event));
        callEntity.channel1 = event.Channel;
        callEntity.uniqueId1 = event.UniqueID;
        callEntity.channel2 = event.Destination;
        callEntity.uniqueId2 = event.DestUniqueID;
        callEntity.dialString = event.Dialstring;
        callEntity.clidNum = event.CallerIDNum;
        callEntity.clidName = event.CallerIDName;
        this.saveCall(callEntity);
    } else if (event.SubEvent === 'End') {
        this.logger.debug('End Call: ' + util.inspect(event));
        this.getCall(event.Uniqueid, function(call) {
            if (call !== null) {
                call.dialStatus = event.DialStatus;
                self.saveCall(call);
            }
        });
    }
}

CallListener.prototype.shutdown = function () {
};

exports.listener = null;

exports.run = function (resources) {
    exports.listener = new CallListener(resources);
};

exports.shutdown = function (resources) {
    exports.listener.shutdown();
};
