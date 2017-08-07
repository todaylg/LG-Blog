 /** 
 * 用户表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');//node自带


var UserSchema = new Schema({
	username:String,
	intro: {
		type:String
	},
	password: String,
	salt: String,
	role: {
		type : String ,
		default : '0'
	},
	avatar:String,
	status:{
		type:Number,
		default:0
	},
	created: {
		type: Date,
		default: Date.now
	},
  updated: {
    type: Date,
    default: Date.now
  }
});

/**
 * Virtuals
 */
// UserSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// UserSchema
//   .virtual('userInfo')
//   .get(function() {
//     return {
//       'nickname': this.nickname,
//       'role': this.role,
//       'email': this.email,
//       'avatar': this.avatar,
//       'likes':this.likeList,
//       'provider':this.provider
//     };
//   });


// // Non-sensitive info we'll be putting in the token
// UserSchema
//   .virtual('token')
//   .get(function() {
//     return {
//       '_id': this._id,
//       'role': this.role
//     };
//   });

// UserSchema
// 	.path('nickname')
// 	.validate(function(value, respond) {
// 		var self = this;
// 		this.constructor.findOne({nickname: value}, function(err, user) {
// 			if(err) throw err;
// 			if(user) {
// 				if(self.id === user.id) return respond(true);
// 				return respond(false);
// 			}
// 			respond(true);
// 		});
// 	}, '这个呢称已经被使用.');
// /**
//  * methods
//  */
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

// UserSchema.set('toObject', { virtuals: true });

var User = mongoose.model('User', UserSchema);
// var Promise = require('bluebird');
// Promise.promisifyAll(User);
// Promise.promisifyAll(User.prototype);

module.exports = User;
