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
	}],
	desc:String	//分类描述
});

var Category = mongoose.model('Category',CategorySchema);

// var Promise = require('bluebird');
// Promise.promisifyAll(Category);
// Promise.promisifyAll(Category.prototype);

module.exports = Category;