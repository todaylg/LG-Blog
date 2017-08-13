'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
  cert = require('../auth/config').jwt.cert,
	jwt = require('jsonwebtoken');

var creatToken = (id, name) => {
    return jwt.sign({
        id: id,
        name: name
    }, cert, { expiresIn: '7d' })
}

exports.userTest = function(req,res) {
  console.log("test");
 return res.json({status:'success',data:'test.'});
};

/* 登陆 */
exports.userLogin = function(req,res) {
  const {username, pwd} = req.body;
  console.log(username);//解构赋值
  console.log(pwd);//解构赋值

  // //简单验证不能为空
  if(username==''||pwd==''){
    res.send({state: -1, msg: '不能为空'}) 
    console.log('不能为空');
  }
  
  User.findOne({username:username},function(err,user) {
    if(err){
      console.log(err);
    }
    if(!user) {
      console.log('用户不存在');
      res.status(401).end();
    }
    // 使用user实例方法对用户名密码进行比较
    if(user.comparePassword(pwd)){
      var token = creatToken(user._id, user.username);
      console.log('登录成功');
      res.send({state: 1, username:user.username,intro:user.intro,avatar:user.avatar,token}).end();
    }else{
      console.log('密码不正确');
      res.status(401).end();
    }
  });
};
exports.getUserinfo = function(req,res) {
  console.log("getUserinfo ing....");
  User.findOne(null, (err,user)=>{
    if (err) {
      console.log(err)
    } else if (user) {
      console.log(user);
      return res.status(200).json(user);
    }
  });
};

