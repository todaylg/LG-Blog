'use strict';

var express = require('express');
var category = require('../controllers/category.js');
var auth = require('../auth/index.js');

var router = express.Router();
//admin
router.post('/addCat',auth.adminRequired,category.addCat);
router.get('/getCatList',auth.adminRequired,category.getCatList);
router.put('/:id/updateCat', auth.adminRequired, category.updateCat);
router.delete('/:id', auth.adminRequired, category.delCat);

//front
router.get('/getFrontCatList',category.getFrontCatList);
router.get('/getFrontCatAriticle',category.getFrontCatAriticle);

module.exports = router;