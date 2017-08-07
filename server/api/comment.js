'use strict';

var express = require('express');
var comment = require('../controllers/comment.js');
var auth = require('../auth/index.js');

var router = express.Router();
//后台管理
router.delete('/:id',auth.adminRequired,comment.delComment);
router.put('/:id/delReply', auth.adminRequired, comment.delReply);
//前台获取
router.post('/addNewComment',auth.signinRequired,comment.addNewComment);
router.get('/:id/getFrontCommentList',comment.getFrontCommentList);
router.post('/:id/addNewReply',auth.signinRequired,comment.addNewReply);

module.exports = router;