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
	articleList:[{//分类下的所属文章列表
		type: Schema.Types.ObjectId,
		ref: 'Article'
	}]
});

var Category = mongoose.model('Category',CategorySchema);

module.exports = Category;