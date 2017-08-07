'use strict';

var express = require('express');
var article = require('../controllers/article.js');
var auth = require('../auth/auth.service');
var multer  = require('multer');
var upload = multer({ dest: 'upload/' });

var router = express.Router();
//后台管理
router.post('/addArticle',auth.adminRequired,article.addArticle);
router.get('/getArticleList',auth.adminRequired,article.getArticleList);
router.put('/:id/updateArticle', auth.adminRequired, article.updateArticle);
router.delete('/:id', auth.adminRequired, article.destroy);
router.get('/:id/getArticle', auth.adminRequired, article.getArticle);
router.post('/uploadImage', auth.adminRequired, upload.single('file'), article.uploadImage);

//前台获取
router.get('/getFrontArticleList',article.getFrontArticleList);
router.get('/getFrontArticleCount',article.getFrontArticleCount);
router.get('/:id/getFrontArticle',article.getFrontArticle);

//获取上一篇和下一篇
router.get('/:id/getPrenext',article.getPrenext);
module.exports = router;