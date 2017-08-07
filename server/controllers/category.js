'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var TagCategory = mongoose.model('TagCategory');
var Tag = mongoose.model('Tag');

//添加分类.
exports.addCat = function (req,res,next) {
	var catName = req.body.name;
	if(!catName){
		return res.status(422).send({error_msg:"标签分类名称不能为空."});
	}
	TagCategory.findOneAsync({name:catName}).then(function (cat) {
		if(cat){
			return res.status(403).send({error_msg:"分类名称已经存在."});
		}else{
			return TagCategory.createAsync(req.body).then(function (result) {
				return res.status(200).json({success:true,cat_id:result._id});
			});
		}
	}).catch(function (err) {
		return next(err);
	})
}

//获取分类列表
exports.getCatList = function (req,res,next) {
	TagCategory.findAsync().then(function(result){
		return res.status(200).json({data:result});
	}).catch(function (err) {
		return next(err);
	})
}

//更新分类
exports.updateCat = function (req,res) {
	var id = req.params.id;
	if(req.body._id){
	  delete req.body._id;
	}
	TagCategory.findByIdAndUpdateAsync(id,req.body,{new:true}).then(function(result){
		return res.status(200).json({success:true,cat_id:result._id});
	}).catch(function(err){
		return next(err);
	});
}
//删除分类
//(如果分类下有文章,则不可删除？？？)
exports.delCat = function (req,res,next) {
	var id = req.params.id;
	Tag.findOneAsync({cid:id}).then(function (tag) {
		if(tag){
			//分类下有标签,分类不可删除
			return res.status(403).send({error_msg:"此分类下有标签不可删除."});
		}else{
			return TagCategory.findByIdAndRemoveAsync(id).then(function(cat) {
				return res.status(200).json({success:true});
			});
		}
	}).catch(function (err) {
		return next(err);
	})
}

//前台数据
//获取所有分类
exports.getFrontCatList = function (req,res,next) {
	Tag.findAsync({is_show:true},{},{sort:{'sort':-1}}).then(function (result) {
		return res.status(200).json({data:result});
	}).catch(function (err) {
		return next(err);
	});
}
//获得分类下的文章
exports.getFrontCatAriticle = function (req,res,next) {
	Tag.findAsync({is_show:true},{},{sort:{'sort':-1}}).then(function (result) {
		return res.status(200).json({data:result});
	}).catch(function (err) {
		return next(err);
	});
}