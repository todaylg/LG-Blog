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

var Article = mongoose.model('Article',ArticleSchema);
module.exports = Article;