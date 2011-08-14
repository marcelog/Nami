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
