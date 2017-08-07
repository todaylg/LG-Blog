'use strict';

var express = require('express');
var user = require('../controllers/user.js');
var confirmToken = require('../auth/index.js');

var router = express.Router();

//front
router.get('/test', confirmToken, user.test);//test
router.post('/signin', user.signin);//登陆

//admin
// router.get('/userList', auth.adminRequired, user.userList);
// router.post('/addUser', auth.adminRequired, user.addUser);
// router.delete('/:id', auth.adminRequired, user.delUser);
// router.put('/:id/updateUser', auth.adminRequired, user.updateUser);//改包括其他用户的信息

// router.put('/mdUser', auth.signinRequired, user.mdUser);//改自己的信息
// router.get('/getUserInfo', auth.signinRequired, user.getUserInfo);

module.exports = router;
