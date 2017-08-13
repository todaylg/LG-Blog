'use strict';

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Blog = mongoose.model('Article');

//添加新的评论. comment对象包含所有参数
exports.addNewComment = function (req,res,next) {
	var comment = req.body.comment;
	var error_msg;
	if(!comment.aid){
		error_msg = '缺少必须参数';
	}else if(!comment.content || comment.content == ''){
		error_msg = "评论内容不能为空";
	}
	if(error_msg){
		return res.status(422).send({error_msg:error_msg});
	}
	Comment.create(comment).then(function (result) {
		var comment = result.toObject();
		Blog.findByIdAndUpdateAsync(aid,{$inc:{comment_count:1}});
		return res.status(200).json({success:true,data:comment});
	}).catch(function (err) {
		return next(err);
	});
}
//获取评论列表（后台）
exports.getCommentList = function (req,res,next) {
	Comment.find()
	.sort('created')
	.exec().then(function (commentList) {
		return res.status(200).json({data:commentList});
	}).then(null,function (err) {
		return next(err);
	});
}

//删除评论.
exports.delComment = function (req,res,next) {
	var cid = req.params.id;
	Comment.findByIdAndRemoveAsync(cid).then(function (result) {
		//评论数-1  
		Blog.findByIdAndUpdateAsync(result.aid,{$inc:{comment_count:-1}});
		return res.status(200).json({success:true});
	}).catch(function (err) {
		return next(err);
	})
}

//获取评论列表.（单篇文章）
exports.getFrontCommentList = function (req,res,next) {
	var aid = req.params.id;
	Comment.find({aid:aid,status:{$eq:1}})
	.sort('created')
	.populate({
		path: 'user_id',
		select: 'nickname avatar'
	})
	.exec().then(function (commentList) {
		return res.status(200).json({data:commentList});
	}).then(null,function (err) {
		return next(err);
	});
}