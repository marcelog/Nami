var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
	event: { type: String },
	name: { type: String, index: true},
	uniqueId: { type: String, index: true},
	channel: { type: String, index: true}
});

var CallSchema = new Schema({
	channel1: { type: String },
	channel2: { type: String },
	dialedTime: { type: Number },
	answeredTime: { type: Number},
	dialStatus: { type: String },
	hangupCause: { type: Number },
	hangupTxt: { type: String }
});
var EventModel = mongoose.model('Events', EventSchema);
var CallModel = mongoose.model('Calls', CallSchema);

exports.EventModel = EventModel;
exports.CallModel = CallModel;
exports.mongoose = mongoose;
