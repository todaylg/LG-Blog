/**
 * 分类表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name:{//分类名称
		type:String,
		unique: true
	},
	intro:String//分类简介（用于前台展示）
});

var Category = mongoose.model('Category',CategorySchema);

module.exports = Category;