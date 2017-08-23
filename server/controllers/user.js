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

  //简单验证
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
      return res.status(200).json({state: 1, username:user.username,intro:user.intro,avatar:user.avatar,token});
    }else{
      console.log('密码不正确');
      res.status(401).end();
    }
  });
};

exports.changePwd = function(req,res) {
  const {_id,password} = req.body;
  console.log('newPassword: '+password);//解构赋值
  console.log('_id: '+_id);
  //简单验证
  if(_id==''||password==''){
    res.send({state: -1, msg: '缺少参数'}) 
    console.log('缺少参数');
  }
  User.findById(_id,function (err, user) {
    if(err){
      console.log(err);
      return res.status(401).end();
    }else if(user){
      user.password = password;
      user.save();
      console.log('修改密码成功');
      console.log('user.Newpassword: '+user.password);
      return res.status(200).end();
    }else{
      console.log('无此用户');
      return res.status(401).end();
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
      return res.status(200).json({_id:user._id,username:user.username,intro:user.intro,avatar:user.avatar});
    }
  });
};

