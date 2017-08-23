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
router.post('/changePwd', User.changePwd);

module.exports = router;
