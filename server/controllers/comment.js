'use strict';

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Article = mongoose.model('Article');

//获取评论列表（后台）
exports.getCommentList = function (req,res,next) {
	console.log('getCommentList ing.....');
	Comment.find()
	.sort('created')
	.exec().then(function (commentList) {
		console.log('getCommentList ok!!');
		return res.status(200).json({data:commentList});
	}).then(null,function (err) {
		return next(err);
	});
}

//删除评论.
exports.delComment = function (req,res,next) {
	console.log('delComment ing.....');
	var cid = req.body.id;
	Comment.findByIdAndRemove(cid).then(function (result) {
		//评论数-1
		console.log(result);  
		Article.findOneAndUpdate({title:result.atitle},{$inc:{comment_count:-1}}).then(function(result){
			console.log('delComment ok!!: '+result);
			return res.send({state: 1, msg: 'delComment success'});
		})
	}).catch(function (err) {
		return next(err);
	})
}


//获取评论列表.（单篇文章）
exports.getFrontComment = function (req,res,next) {
	console.log('getFrontComment ing.....');
	var atitle = req.body.atitle;
	// Comment.find({aid:aid,status:{$eq:1}})//回收站TODO
	Comment.find({atitle:atitle})
	.sort('created')
	// .populate({ //跨表取数据，相当于mysql的join
	// 	path: 'user_id',
	// 	select: 'nickname avatar'
	// })
	.exec().then(function (commentList) {
		console.log('getFrontComment ok!!: '+commentList);
		return res.status(200).json({data:commentList});
	}).then(null,function (err) {
		return next(err);
	});
}

//添加新的评论. comment对象包含所有参数
exports.addComment = function (req,res,next) {
	var error_msg;
	console.log('addComment ing.....');
	var comment = req.body.comment;
	console.log("comment:"+comment);
	if(!comment.atitle){
		error_msg = '缺少必须参数';
	}else if(!comment.content || comment.content == ''){
		error_msg = "评论内容不能为空";
	}
	if(error_msg){
		console.log('addComment 失败!!');
		return res.status(422).send({state: 0, msg: 'delComment success'});
	}
	Comment.create(comment).then(function (result) {
		var comment = result.toObject();
		Article.findOneAndUpdate({title:comment.atitle},{$inc:{comment_count:1}}).then(function(result){
			console.log('addComment 成功!!: '+comment.atitle);
			return res.send({state: 1, data: comment});
		})
	}).catch(function (err) {
		return next(err);
	});
}


