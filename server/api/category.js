'use strict';

var express = require('express');
var Category = require('../controllers/category.js');

var router = express.Router();
//admin
router.post('/addCategory',Category.addCategory);
router.get('/getCatList', Category.getCatList);
router.post('/updateCat', Category.updateCat);
router.post('/delCategory', Category.delCat);

//front
// router.get('/getFrontCatList',category.getFrontCatList);
// router.get('/getFrontCatAriticle',category.getFrontCatAriticle);

module.exports = router;