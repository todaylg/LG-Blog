'use strict';

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

exports.addArticle = function (req,res,next) {
	console.log("addArticle ing....");
	const title = req.body.title
	const article = {
	  title: req.body.title,
	  updated: req.body.date,
	  content: req.body.content
	}
	if (title) {//title不能重复
		Article.findOne({title},(err,doc)=>{
		  	if (err) {
	    		console.log(err)
	    	} else if (doc) {
		  		console.log("title name used!!");
		  		return res.send({state: 0, msg: '文章标题名已经被使用'}).end();
		  	} else {
			new Article(article).save();
			console.log("new Article!!");
			return res.send({state: 1, msg: '新文章已创建'}).end();
			}
		});
	}else{
		return res.send({state: 0, msg: '文章标题名不能为空'}).end();
	}
}

exports.updateArticle = function (req,res,next) {
	console.log("updatesaveArticle ing....");
	const id = req.body.id
	const article = {
	  title: req.body.title,
	  updated: req.body.date,
	  content: req.body.content
	}
	if (id) {
	  Article.findByIdAndUpdate(id,article,()=>{
	  	console.log("update callback");
	  	res.send({state: 1, msg: '更新成功'}).end();
	  });
	} else {
	  console.log("No this Aticle!!")
	  return res.status(500).end();
	}
	
}

exports.getArticle = function (req,res,next) {
	console.log("getArticle ing....");
	const _id = req.query.id;
	Article.findOne({_id}, (err, doc) => {
		if (err) {
			console.log(err);
		} else if (doc) {
			console.log("getArticle sucess!");
			res.send(doc);
		}
	});
}

exports.delArticle = function (req,res,next) {
	console.log("delArticle ing....");
	const id = req.body.id;
	console.log(id);
	Article.findByIdAndRemove(id, () => {
		res.send({state: 1, msg: '删除成功'}).end();
	});
}
exports.getArticleList = function (req,res,next) {
	console.log("getArticleList ing....");
	Article.find(null, 'title created content', (err, doc) => {
		if (err) {
			console.log(err)
		} else if (doc) {
			res.send(JSON.stringify(doc))
		}
	})
}

