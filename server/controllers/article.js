'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var qiniuHelper = require('../../util/qiniu');
var path = require('path');
var URL = require('url');
var MarkdownIt = require('markdown-it');
var config = require('../../config/env');
var Promise = require("bluebird");
var tools = require('../../util/tools');
var redis = require('../../util/redis');

//添加博客
exports.addArticle = function (req,res,next) {
	var content = req.body.content;
	var title = req.body.title;
	var error_msg;
	if(!title){
		error_msg = '标题不能为空.';
	}else if(!content){
		error_msg = '内容不能为空.';
	}
	if(error_msg){
		return res.status(422).send({error_msg:error_msg});
	}
	//将图片提取存入images,缩略图调用
	req.body.images = tools.extractImage(content);
	return Article.createAsync(req.body).then(function (result) {
		return res.status(200).json({success: true,article_id:result._id});
	}).catch(function (err) {
	 	return next(err);
	});
}
//后台获取博客列表
exports.getArticleList = function (req,res,next) {
	var currentPage = (parseInt(req.query.currentPage) > 0)?parseInt(req.query.currentPage):1;
	var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0)?parseInt(req.query.itemsPerPage):10;
	var startRow = (currentPage - 1) * itemsPerPage;

	var sortName = String(req.query.sortName) || "publish_time";
	var sortOrder = req.query.sortOrder;
	if(sortOrder === 'false'){
		sortName = "-" + sortName;
	}

	Article.find()
		.skip(startRow)
		.limit(itemsPerPage)
		.sort(sortName)
		.exec().then(function (ArticleList) {
			return Article.countAsync().then(function (count) {
				return res.status(200).json({ data: ArticleList, count:count });
			});
		}).then(null,function (err) {
			return next(err);
		});
}

//删除博客(连同这篇文章的评论一起删除.)
exports.destroy = function (req,res,next) {
	var id = req.params.id;
	Article.findByIdAndRemoveAsync(id).then(function() {
		return Comment.removeAsync({aid:id}).then(function () {
			return res.status(200).send({success: true});
		});
	}).catch(function (err) {
		return next(err);
	});
}
//更新博客
exports.updateArticle = function (req,res,next) {
	var id = req.params.id;
	if(req.body._id){
	  delete req.body._id;
	}
	var content = req.body.content;
	var title = req.body.title;
	var error_msg;
	if(!title){
		error_msg = '标题不能为空.';
	}else if(!content){
		error_msg = '内容不能为空.';
	}
	if(error_msg){
		return res.status(422).send({error_msg:error_msg});
	}
	//将图片提取存入images,缩略图调用
	req.body.images = tools.extractImage(content);
	req.body.updated = new Date();
	if(req.body.isRePub){
		req.body.publish_time = new Date();
	}

	Article.findByIdAndUpdateAsync(id,req.body,{new:true}).then(function(article){
		return res.status(200).json({success:true,article_id:article._id});
	}).catch(function(err){
		return next(err);
	});
}
//获取单篇博客
exports.getArticle = function (req,res) {
	var id = req.params.id;
	Article.findOne({_id:id})
		.populate('tags')
		.exec().then(function (article) {
			return res.status(200).json({data:article});
		}).then(null,function (err) {
			return res.status(500).send();
		});
}
//上传图片
exports.uploadImage = function (req,res,next) {
	var file = req.file;
	if(!file){
		return res.status(422).send({error_msg:"缺少文件参数."});
	}
	var fileName =  new Date().getTime() + file.originalname;
	qiniuHelper.upload(file.path,'blog/article/' + fileName).then(function (result) {
		return res.status(200).json({success:true,img_url:result.url});
	}).catch(function (err) {
		return next(err);
	});
}

//将网络图片抓取到七牛

//前台获取博客数量
exports.getFrontArticleCount = function (req,res,next) {
	var condition = {status:{$gt:0}};
	if(req.query.tagId){
		//tagId = new mongoose.Types.ObjectId(tagId);
		var tagId = String(req.query.tagId);
		condition = _.defaults(condition,{ tags: { $elemMatch: { $eq:tagId } } });
	}
	Article.countAsync(condition).then(function (count) {
		return res.status(200).json({success:true,count:count});
	}).catch(function (err) {
		return next(err);
	})
}
//前台获取博客列表
exports.getFrontArticleList = function (req,res,next) {
	var currentPage = (parseInt(req.query.currentPage) > 0)?parseInt(req.query.currentPage):1;
	var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0)?parseInt(req.query.itemsPerPage):10;
	var startRow = (currentPage - 1) * itemsPerPage;
	var sort = String(req.query.sortName) || "publish_time";
	sort = "-" + sort;
	var condition = {status:{$gt:0}};
	if(req.query.tagId){
		//tagId = new mongoose.Types.ObjectId(tagId);
		var tagId = String(req.query.tagId);
		condition = _.defaults(condition,{ tags: { $elemMatch: { $eq:tagId } } });		
	}
	Article.find(condition)
		.select('title images visit_count comment_count like_count publish_time')
		.skip(startRow)
		.limit(itemsPerPage)
		.sort(sort)
		.exec().then(function (list) {
			return res.status(200).json({data:list});
		}).then(null,function (err) {
			return next(err);
		});
}

//前台获取文章
exports.getFrontArticle = function (req,res,next) {
	var id = req.params.id;
	var md = new MarkdownIt({
		html:true //启用html标记转换
	});
	//每次获取之后,将阅读数加1
	return Article.findByIdAsync(id,'-images').then(function(result) {
		//将content markdown文档转成HTML
		result.content = md.render(result.content);
		result.visit_count++;
		Article.findByIdAndUpdateAsync(id,{$inc:{visit_count:1}});
		return res.status(200).json({data:result.info});
	}).catch(function (err) {
		return next(err);
	});

}
//前台获取上一篇和下一篇
exports.getPrenext = function (req,res,next) {
	var id = req.params.id;
	var sort = String(req.query.sortName) || "publish_time";
	var preCondition,nextCondition;
	preCondition = {status:{$gt:0}};
	nextCondition = {status:{$gt:0}};
	if(req.query.tagId){
		//tagId = new mongoose.Types.ObjectId(tagId);
		var tagId = String(req.query.tagId);
		preCondition =  _.defaults(preCondition,{ tags: { $elemMatch: { $eq:tagId } } });
		nextCondition =  _.defaults(nextCondition,{ tags: { $elemMatch: { $eq:tagId } } });
	}
	Article.findByIdAsync(id).then(function (article) {
		//先获取文章,
		if(sort === 'visit_count'){
			preCondition = _.defaults(preCondition,{'_id':{$ne:id},'visit_count':{'$lte':article.visit_count}});
			nextCondition = _.defaults(nextCondition,{'_id':{$ne:id},'visit_count':{'$gte':article.visit_count}});
		}else{
			preCondition = _.defaults(preCondition,{'_id':{$ne:id},'publish_time':{'$lte':article.publish_time}});
			nextCondition = _.defaults(nextCondition,{'_id':{$ne:id},'publish_time':{'$gte':article.publish_time}});
		}
		var prePromise = Article.find(preCondition)
			.select('title')
			.limit(1)
			.sort('-' + sort)
			.exec();

		var nextPromise = Article.find(nextCondition)
				.select('title')
				.limit(1)
				.sort(sort)
				.exec();
		prePromise.then(function (preResult) {
			var prev = preResult[0] || {};
			return nextPromise.then(function (nextResult) {
				var next = nextResult[0] || {};
				return {'next':next,'prev':prev};
			})
		}).then(function (result) {
			return res.status(200).json({data:result});
		})
	}).catch(function (err) {
		return next(err);
	})
}
