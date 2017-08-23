 /** 
 * 用户表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');


var UserSchema = new Schema({
	username:String,
	intro: {
		type:String
	},
	password: String,
	salt: String,
	// role: {
	// 	type : String ,
	// 	default : '0'
	// },
	avatar:String,
	// status:{
	// 	type:Number,
	// 	default:0
	// },
});

UserSchema.methods = {
	//验证用户密码
	comparePassword: function(plainText) {
	  return this.encryptPassword(plainText,this.salt) === this.password;
	},
	encryptPassword: function(password,salt) {
	  if (!password || !this.salt) return '';
	  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
	}
}

UserSchema.pre('save',function(next) {
	if(this.password){
		this.salt = crypto.randomBytes(16).toString('base64');
		this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 64, 'sha1').toString('base64');
	}
	next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
