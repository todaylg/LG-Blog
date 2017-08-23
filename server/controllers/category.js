'use strict';

var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Article = mongoose.model('Article');

//添加分类.
exports.addCategory = function (req,res,next) {
	console.log("addCategory ing....");
	var catName = req.body.catName;
	var intro = req.body.catIntro;
	if(!catName){
		console.log("标签分类名称不能为空.");
		return res.status(422).end();
	}
	Category.findOne({name:catName}).then(function (cat) {
		if(cat){
			console.log("分类名称已经存在.");
			return res.status(403).end();
		}else{
			new Category({'name':catName,"intro":intro}).save();
			console.log("new Category!!");
	  		return res.status(200).end();
		}
	}).catch(function (err) {
		return next(err);
	})
}

//获取分类列表
exports.getCatList = function (req,res,next) {
	console.log("getCatList ing....");
	Category.find().then(function(result){
		console.log("getCatList ok!");
		return res.status(200).json(result);
	}).catch(function (err) {
		return res.status(401).end();//TODO
	})
}

//更新分类
exports.updateCat = function (req,res) {
	console.log("updateCat ing....");
	var id = req.body.id;
	Category.findByIdAndUpdate(id,{name:req.body.val},{new:true}).then(function(result){
		return res.status(200).end();
		console.log("updateCat sucess....");
	}).catch(function(err){
		return res.status(401).end();//TODO
	});
}

//删除分类
//(如果分类下有文章,则不可删除？？？) TODO
exports.delCat = function (req,res,next) {
	console.log("delCat ing....");
	var id = req.body.id;
	console.log(id);
	Category.findByIdAndRemove(id).then(function (cat) {
		return res.status(200).end();
	}).catch(function (err) {
		return res.status(401).end();//TODO
	})
}

// //前台数据
// //获取分类
exports.getCat = function (req,res,next) {
	console.log("getCat ing....");
	var catname = req.body.catname+'';
	console.log("CatName....:"+catname);
	Category.findOne({name:catname},(err, result) => {
		console.log(result);
	    if (err) {
	      console.log(err)
	    } else if (result) {
	      console.log("getCat...OK!!");
		  console.log(result);
		  return res.status(200).json(result);
	    }
	});
}
// //获得分类下的文章
exports.getCatAticle = function (req,res,next) {
	console.log("getCatAticle ing....");
	var page = req.query.page;
	var limit = req.query.limit-0 || 4;
	var skip = limit * (page - 1 );
	var catname = req.query.catname;
	console.log("page: "+page+";limit: "+limit+";skip: "+skip);
	Article.find({category:catname,status:1},"title created intro special_img visit_count comment_count").sort({created:-1}).skip(skip).limit(limit).exec().then((articles) => {
		console.log("getCatAticle...OK!!");
		return res.status(200).json(articles);
	}).catch(function (err) {
		return next(err);
	});
}