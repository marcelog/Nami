/*!
 * Models for mongodb.
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
var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
	event: { type: String },
	name: { type: String, index: true},
	uniqueId: { type: String, index: true},
	channel: { type: String, index: true}
});

var CallSchema = new Schema({
	channel1: { type: String, index: true },
    uniqueId1: { type: String, index: true },
	channel2: { type: String, index: true },
    uniqueId2: { type: String, index: true },
    dialString: { type: String, index: true },
    clidNum: { type: String, index: true },
    clidName: { type: String, index: true },
	dialedTime: { type: Number },
	answeredTime: { type: Number},
	dialStatus: { type: String, index: true },
	hangupCause: { type: Number, index: true },
    start: { type: Date, index: true, default: Date.now },
    end: { type: Date, index: true }
});
var EventModel = mongoose.model('Events', EventSchema);
var CallModel = mongoose.model('OutgoingCalls', CallSchema);

exports.EventModel = EventModel;
exports.CallModel = CallModel;
exports.mongoose = mongoose;
