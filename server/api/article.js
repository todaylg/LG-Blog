'use strict';

var express = require('express');
var Article = require('../controllers/article.js');
var router = express.Router();
var confirmToken = require('../auth/index.js');

//admin
router.post('/getArticle', confirmToken, Article.getArticle);
router.post('/addArticle', confirmToken, Article.addArticle);
router.post('/updateArticle', confirmToken, Article.updateArticle);
router.get('/getArticleList', confirmToken, Article.getArticleList);
router.post('/delArticle', confirmToken, Article.delArticle);

//front
router.get('/getFrontArticleList',Article.getFrontArticleList);
router.post('/getFrontArticle',Article.getFrontArticle);

module.exports = router;