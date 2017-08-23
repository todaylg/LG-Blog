'use strict';

var express = require('express');
var logs = require('../controllers/logs.js');
var auth = require('../auth/index.js');

var router = express.Router();
//后台日志查看 //TODO
router.get('/getLogsList',logs.getLogsList);

module.exports = router;