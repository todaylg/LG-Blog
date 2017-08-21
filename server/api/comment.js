'use strict';

var express = require('express');
var Comment = require('../controllers/comment.js');
var confirmToken = require('../auth/index.js');

var router = express.Router();

//后台管理
router.get('/getCommentList', confirmToken, Comment.getCommentList);
router.post('/delComment', confirmToken, Comment.delComment);
// router.put('/:id/delReply', auth.adminRequired, Comment.delReply);
//前台获取
router.post('/addComment',Comment.addComment);
router.post('/getFrontComment',Comment.getFrontComment);
// router.post('/:id/addNewReply',auth.signinRequired,Comment.addNewReply);

module.exports = router;