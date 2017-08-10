'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	jwt = require('jsonwebtoken');

var creatToken = (id, name) => {
    return jwt.sign({
        id: id,
        name: name
    }, "123", { expiresIn: '7d' })
}

exports.userTest = function(req,res) {
  console.log("test");
 return res.json({status:'success',data:'test.'});
};

/* 登陆 */
exports.userLogin = function(req,res) {
  const {name, pwd} = req.body;
  console.log(name);//解构赋值
  console.log(pwd);//解构赋值

  // //简单验证不能为空
  if(name==''||pwd==''){
    res.send({state: -1, msg: '不能为空'}) 
    console.log('不能为空');
  }
  
  User.findOne({username:name},function(err,user) {
    console.log(user);
    if(err){
      console.log(err);
    }
    if(!user) {
      res.send({state: 0, msg: '用户不存在'})
      console.log('用户不存在');                  // 用户不存在
    }
    // 使用user实例方法对用户名密码进行比较
    if(user.comparePassword(pwd)){
      var token = creatToken(user._id, user.username)
      res.send({state: 1, msg: '简单的登录成功', token});
      console.log('简单的登录成功');
    }else{
      res.send({state: 2, msg: '其他原因登录失败'})
      console.log('密码不正确');
    }
  });
};
