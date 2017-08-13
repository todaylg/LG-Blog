'use strict';

var express = require('express');
var Article = require('../controllers/article.js');
var router = express.Router();
var confirmToken = require('../auth/index.js');

//后台管理
router.get('/getArticle', Article.getArticle);
router.post('/addArticle', Article.addArticle);
router.post('/updateArticle', Article.updateArticle);
router.get('/getArticleList', Article.getArticleList);
router.post('/delArticle', Article.delArticle);
// router.put('/:id/updateArticle', auth.adminRequired, article.updateArticle);
// router.delete('/:id', auth.adminRequired, article.destroy);
// router.get('/:id/getArticle', auth.adminRequired, article.getArticle);
// router.post('/uploadImage', auth.adminRequired, upload.single('file'), article.uploadImage);

// //前台获取
router.get('/getFrontArticleList',Article.getFrontArticleList);
// router.get('/getFrontArticleCount',article.getFrontArticleCount);
// router.get('/:id/getFrontArticle',article.getFrontArticle);

// //获取上一篇和下一篇
// router.get('/:id/getPrenext',article.getPrenext);
module.exports = router;