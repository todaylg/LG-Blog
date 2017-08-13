/**
 * 评论表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	aid:{
		type: Schema.Types.ObjectId,
		ref: 'Article'
	},
	username:String,
	email:String,
	content:String,
	created: {
		type: Date,
		default: Date.now
	}
});

var Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;