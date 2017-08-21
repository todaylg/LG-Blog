'use strict';

var express = require('express');
var User = require('../controllers/user.js');
var confirmToken = require('../auth/index.js');

var router = express.Router();

//front
router.get('/userTest', confirmToken, User.userTest);//test
router.post('/userLogin', User.userLogin);//登陆

//admin
router.get('/getUserinfo', confirmToken, User.getUserinfo);
// router.post('/addUser', auth.adminRequired, User.addUser);
// router.delete('/:id', auth.adminRequired, User.delUser);
// router.put('/:id/updateUser', auth.adminRequired, User.updateUser);//改包括其他用户的信息

// router.put('/mdUser', auth.signinRequired, User.mdUser);//改自己的信息
// router.get('/getUserInfo', auth.signinRequired, User.getUserInfo);

module.exports = router;
