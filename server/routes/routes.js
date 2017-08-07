'use strict';

var path = require('path');
var fs = require('fs');      

//路由分配好路径归哪个controller管 ，之后controller来进行模块和视图的读取和展示
module.exports = function(app) {
	app.use('/api/user', require('../api/user'));
	// app.use('/api/category',require('../api/category'));
	// app.use('/api/article',require('../api/article'));
	// app.use('/api/comment', require('../api/comment'));
	// app.use('/api/logs',require('../api/logs'));//多用户这个日志是必要的
	app.use('/api/*', function (req,res,next) {
		return res.json({status:'success',data:'other.'});
	})
	
};
