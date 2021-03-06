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
	  category: req.body.category,
	  created: req.body.created
	}
	if (title) {//title不能重复
		Article.findOne({title},(err,doc)=>{
		  	if (err) {
	    		console.log(err)
	    	} else if (doc) {
		  		console.log("title name used!!");
		  		return res.status(401).end();//TODO
		  	} else {
		  		if(article.content=='')return res.status(401).end();//TODO
				article.intro = article.content.substring(0,25);
				article.intro+='......';
				new Article(article).save();
				console.log("new Article!!");
				return res.status(200).end();
			}
		});
	}else{
		return res.status(401).end();//TODO
	}
}

exports.updateArticle = function (req,res,next) {
	console.log("updateArticle ing....");
	let introTemp = req.body.content.substring(0,25);
	introTemp+="......";
	const title = req.body.title
	const article = {
	  title: req.body.title,
	  updated: req.body.date,
	  intro:introTemp,
	  content: req.body.content,
	  special_img:req.body.special_img,
	  category: req.body.category,
	  created: req.body.created
	}
	if (title) {
		Article.findById(req.body._id,(err, doc)=>{
			console.log(doc.title);
			if (err) {
				console.log(err);
			} else if (doc.title != req.body.title) {//可以用原title
				Article.findOne({title}, (err, doc) => {//title不能重复
					if (err) {
						console.log(err);
					} else if (doc) {
						console.log("Title不能重复!!")
					  	return res.status(401).end();
					}else{
					  	Article.findByIdAndUpdate(req.body._id,article,(err,doc)=>{
						  	if (err) {
					    		console.log(err)
					    	} else if (doc) {
						  		console.log("Article更新成功!!");
						  		return res.status(200).end();
						  	}else {
							  console.log("Article更新失败!!")
							  return res.status(401).end();
							}
						});
					}
				});
			}else{
			  	Article.findByIdAndUpdate(req.body._id,article,(err,doc)=>{
				  	if (err) {
			    		console.log(err)
			    	} else if (doc) {
				  		console.log("Article更新成功!!");
				  		return res.status(200).end();
				  	}else {
					  console.log("Article更新失败!!")
					  return res.status(401).end();
					}
				});
			}
		})
	}else{
		return res.status(401).end();
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
	Article.findByIdAndRemove(id, () => {//todo err
		return res.status(200).end();
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