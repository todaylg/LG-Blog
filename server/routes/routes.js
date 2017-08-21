'use strict';

var path = require('path');
var fs = require('fs');     

//路由分配好路径归哪个controller管 ，之后controller来进行模块和视图的读取和展示
module.exports = function(app) {
	app.use('/api', require('../api/user'));
	app.use('/api', require('../api/category'));
	app.use('/api', require('../api/article'));
	app.use('/api', require('../api/comment'));
	// app.use('/api/logs',require('../api/logs'));//多用户这个日志是必要的
};
