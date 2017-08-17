/**
 * 评论表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	atitle:String,//评论文章
	username:String,
	email:String,
	content:String,
	website:String,
	created: {
		type: Date,
		default: Date.now
	}
});

var Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;