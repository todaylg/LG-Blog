/** 
 * 文章表
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
	author_id:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	title:{//唯一
		type:String,
		unique: true
	},
	category:String,//所属分类
	intro:String,//简介
	content:String,
	special_img:{
		type:String,
		default:"http://onok3htf1.bkt.clouddn.com/WY_bg.png"
	},
	visit_count:{//访问数
		type:Number,
		default:1
	},
	comment_count:{//评论数
		type:Number,
		default:0
	},
	status:{//0:草稿 1:发布
		type:Number,
		default:1//测试
	},
	created: {// 创建时间
		type: Date,
		default: Date.now
	},
	publish: {//发布时间
		type: Date,
		default: Date.now
	},
	updated: {// 更新时间
		type: Date,
		default: Date.now
	}
});

// 模式保存前执行下面函数,如果当前数据是新创建，则创建时间和更新时间都是当前时间，
// 否则更新时间是当前时间
// Article.pre('save',function(next) {//每次调用之前都执行这个方法
// 	if(this.isNew) {
// 		this.meta.createAt = this.meta.updateAt = Date.now();
// 	}else{
// 		this.meta.updateAt = Date.now();
// 	}
// 	next();
// });

// 定义查询静态方法
// 静态方法不会与数据库直接交互，需要经过模型编译实例化后才会具有该方法
// Article.statics = {//经过model实例化以后才会有这个方法
// 	fetch: function(cb) {//取出数据库里面的所有数据
// 		return this
// 			.find({})
// 			.sort('created')
// 			.exec(cb);
// 	},
// 	findById: function(id,cb) {
// 		return this
// 			.findOne({_id: id})
// 			.exec(cb);
// 	}
// };


var Article = mongoose.model('Article',ArticleSchema);

// var Promise = require('bluebird'); //Promise化
// Promise.promisifyAll(Article);
// Promise.promisifyAll(Article.prototype);

module.exports = Article;