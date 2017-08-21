'use strict';

var express = require('express');
var Article = require('../controllers/article.js');
var router = express.Router();
var confirmToken = require('../auth/index.js');

//后台管理
router.post('/getArticle', confirmToken, Article.getArticle);
router.post('/addArticle', confirmToken, Article.addArticle);
router.post('/updateArticle', confirmToken, Article.updateArticle);
router.get('/getArticleList', confirmToken, Article.getArticleList);
router.post('/delArticle', confirmToken, Article.delArticle);
// router.put('/:id/updateArticle', auth.adminRequired, article.updateArticle);
// router.delete('/:id', auth.adminRequired, article.destroy);
// router.get('/:id/getArticle', auth.adminRequired, article.getArticle);
// router.post('/uploadImage', auth.adminRequired, upload.single('file'), article.uploadImage);

// //前台获取
router.get('/getFrontArticleList',Article.getFrontArticleList);
// router.get('/getFrontArticleCount',article.getFrontArticleCount);
router.post('/getFrontArticle',Article.getFrontArticle);

// //获取上一篇和下一篇
// router.get('/:id/getPrenext',article.getPrenext);
module.exports = router;