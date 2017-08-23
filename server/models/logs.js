'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//TODO
var LogsSchema = new Schema({
	uid: {
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	content: {
    	type:String,
    	trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var Logs = mongoose.model('Logs',LogsSchema);

module.exports = Logs;