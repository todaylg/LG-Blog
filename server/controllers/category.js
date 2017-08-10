'use strict';

var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//添加分类.
exports.addCategory = function (req,res,next) {
	console.log("addCategory ing....");
	var catName = req.body.catName;
	if(!catName){
		console.log("标签分类名称不能为空.");
		return res.status(422).send({error_msg:"标签分类名称不能为空."});
	}
	Category.findOne({name:catName}).then(function (cat) {
		if(cat){
			console.log("分类名称已经存在.");
			return res.status(403).send({error_msg:"分类名称已经存在."});
		}else{
			new Category({'name':catName}).save();
			console.log("new Category!!");
	  		return res.send({state: 1, msg: '新分类目录已创建'}).end();
		}
	}).catch(function (err) {
		return next(err);
	})
}

//获取分类列表
exports.getCatList = function (req,res,next) {
	console.log("getCatList ing....");
	Category.find().then(function(result){
		console.log("getCatList ok:"+result);
		return res.status(200).json({data:result});
	}).catch(function (err) {
		return next(err);
	})
}

//更新分类
exports.updateCat = function (req,res) {
	console.log("updateCat ing....");
	var id = req.body.id;
	Category.findByIdAndUpdate(id,{name:req.body.val},{new:true}).then(function(result){
		// return res.status(200).json({success:true,cat_id:result._id});
		return res.send({state: 1, msg: 'updateCat success'});
		console.log("updateCat sucess....");
	}).catch(function(err){
		return next(err);
	});
}

//删除分类
//(如果分类下有文章,则不可删除？？？) TODO
exports.delCat = function (req,res,next) {
	console.log("delCat ing....");
	var id = req.body.id;
	console.log(id);
	Category.findByIdAndRemove(id).then(function (cat) {
		return res.send({state: 1, msg: 'del success'});
	}).catch(function (err) {
		return next(err);
	})
}

// //前台数据
// //获取所有分类
// exports.getFrontCatList = function (req,res,next) {
// 	Tag.findAsync({is_show:true},{},{sort:{'sort':-1}}).then(function (result) {
// 		return res.status(200).json({data:result});
// 	}).catch(function (err) {
// 		return next(err);
// 	});
// }
// //获得分类下的文章
// exports.getFrontCatAriticle = function (req,res,next) {
// 	Tag.findAsync({is_show:true},{},{sort:{'sort':-1}}).then(function (result) {
// 		return res.status(200).json({data:result});
// 	}).catch(function (err) {
// 		return next(err);
// 	});
// }