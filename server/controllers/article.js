'use strict';

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

exports.addArticle = function (req,res,next) {
	console.log("addArticle ing....");
	const title = req.body.title
	const article = {
	  title: req.body.title,
	  updated: req.body.date,
	  content: req.body.content,
	  category: req.body.belongCat
	}
	if (title) {//title不能重复
		Article.findOne({title},(err,doc)=>{
		  	if (err) {
	    		console.log(err)
	    	} else if (doc) {
		  		console.log("title name used!!");
		  		return res.send({state: 0, msg: '文章标题名已经被使用'}).end();
		  	} else {
		  		if(article.content=='')return res.send({state: 0, msg: '新文章内容不能为空'}).end();
				article.intro = article.content.substring(0,10);
				article.intro+='...';
				new Article(article).save();
				console.log("new Article!!");
				return res.send({state: 1, msg: '新文章成功创建'}).end();
			}
		});
	}else{
		return res.send({state: 0, msg: '文章标题名不能为空'}).end();
	}
}

exports.updateArticle = function (req,res,next) {
	console.log("updatesaveArticle ing....");
	const title = req.body.title
	const article = {
	  title: req.body.title,
	  updated: req.body.date,
	  content: req.body.content,
	  category: req.body.belongCat
	}
	if (title) {//title不能重复
	  	Article.findOneAndUpdate({title},article,(err,doc)=>{
		  	if (err) {
	    		console.log(err)
	    	} else if (doc) {
		  		console.log("Article更新成功!!");
		  		res.send({state: 1, msg: '更新成功'}).end();
		  	}else {
			  console.log("Article更新失败!!")
			  return res.send({state: 0, msg: '更新成功失败'}).end();
			}
		});
	}else{
		return res.send({state: 0, msg: '文章标题名不能为空'}).end();
	}
}

exports.getArticle = function (req,res,next) {
	console.log("getArticle ing....");
	const title = req.body.atitle;
	console.log("title: "+title);
	Article.findOne({title}, (err, doc) => {
		if (err) {
			console.log(err);
		} else if (doc) {
			console.log("getArticle sucess!");
			return res.status(200).json(doc);
		}
	});
}

exports.delArticle = function (req,res,next) {
	console.log("delArticle ing....");
	const id = req.body.id;
	console.log(id);
	Article.findByIdAndRemove(id, () => {
		return res.send({state: 1, msg: '删除成功'}).end();
	});
}
exports.getArticleList = function (req,res,next) {
	console.log("getArticleList ing....");
	Article.find(null, 'title created content category', (err, doc) => {
		if (err) {
			console.log(err)
		} else if (doc) {
			return res.status(200).json(doc);
		}
	})
}
//Front
exports.getFrontArticleList = function (req,res,next) {
	console.log("getFrontArticleList ing....");
	const page = req.query.page;
	const limit = req.query.limit-0 || 4;
	const skip = limit * (page - 1 );
	console.log("page: "+page+";limit: "+limit+";skip: "+skip);
	Article.find({status:1},"title created intro special_img visit_count comment_count").sort({created:-1}).skip(skip).limit(limit).exec().then((articles) => {
		return res.status(200).json(articles);
	});
}
exports.getFrontArticle = function (req,res,next) {
	console.log("getFrontArticle ing....");
	const title = req.body.atitle;
	console.log("title: "+title);
	Article.findOneAndUpdate({title},{$inc:{visit_count:1}},(err, doc) => {
		if (err) {
			console.log(err);
		} else if (doc) {
			console.log("getFrontArticle sucess!: "+doc);
			return res.status(200).json(doc);
		}
	});
}