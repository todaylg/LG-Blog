'use strict';

var express = require('express');
var Category = require('../controllers/category.js');
var confirmToken = require('../auth/index.js');

var router = express.Router();
//admin
router.post('/addCategory', confirmToken, Category.addCategory);
router.get('/getCatList', Category.getCatList);//因为token的加入，所有后台和前台都得分开，才能鉴权
router.post('/updateCat', confirmToken, Category.updateCat);
router.post('/delCategory', confirmToken, Category.delCat);

//front
router.post('/getCat',Category.getCat);//显示当前分类目录的名称及简介
router.get('/getCatAticle',Category.getCatAticle);//显示当前分类目录下的文章

module.exports = router;