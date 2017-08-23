'use strict';

var express = require('express');
var Category = require('../controllers/category.js');
var confirmToken = require('../auth/index.js');

var router = express.Router();
//admin
router.post('/addCategory', confirmToken, Category.addCategory);
router.get('/getCatList', Category.getCatList);
router.post('/updateCat', confirmToken, Category.updateCat);
router.post('/delCategory', confirmToken, Category.delCat);

//front
router.post('/getCat',Category.getCat);//显示当前分类目录的名称及简介
router.get('/getCatAticle',Category.getCatAticle);//显示当前分类目录下的文章

module.exports = router;