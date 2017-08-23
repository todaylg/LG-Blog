'use strict';

var express = require('express');
var Comment = require('../controllers/comment.js');
var confirmToken = require('../auth/index.js');

var router = express.Router();

//admin
router.get('/getCommentList', confirmToken, Comment.getCommentList);
router.post('/delComment', confirmToken, Comment.delComment);

//front
router.post('/addComment',Comment.addComment);
router.post('/getFrontComment',Comment.getFrontComment);

module.exports = router;