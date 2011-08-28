/*!
 * Event message.
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
 * @fileoverview Base event class.
 *
 * @author Marcelo Gornstein - http://marcelog.github.com
 * Website: http://marcelog.github.com/Nami
 */
message = require(__dirname + '/message.js');
util = require('util');

/**
 * Base event class. Every async event from the server ends up being an Event()
 * @constructor
 * @param {String} data A message received from AMI. The End-Of-Message indicator
 * has to be already stripped out. This will call unserialize() to build the actual
 * Message object.
 * @see Message#unmarshall(String)
 * @augments Message
 */
function Event(data) {
    Event.super_.call(this);
    this.unmarshall(data);
}
util.inherits(Event, message.Message);
exports.Event = Event;


