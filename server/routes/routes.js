'use strict';

var path = require('path');
var fs = require('fs');     

module.exports = function(app) {
	app.use('/api', require('../api/user'));
	app.use('/api', require('../api/category'));
	app.use('/api', require('../api/article'));
	app.use('/api', require('../api/comment'));
	//TODO
	// app.use('/api/logs',require('../api/logs'));
};
