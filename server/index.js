"use strict";

var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var history = require('connect-history-api-fallback');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var init = require('./init.json');       

var settings = require('./settings');
var app = express();
var port = process.env.PORT || 3001;

var dbUrl = 'mongodb://localhost/lgBlog';// 数据库地址

//连接数据库
mongoose.connect(dbUrl);
var db = mongoose.connection;
//mongoose promise 风格
mongoose.Promise = global.Promise;


app.use(history());

app.set('port',port);
app.use(express.static(path.join(__dirname, '../dist')));//entry
app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// models loading
var models_path = path.join(__dirname, 'models');// 模型所在路径

//路径加载函数，加载各模型的路径
var walk = function(path) {
	fs 
	.readdirSync(path)
	.forEach(function(file) {
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);
		// 如果是文件
		if (stat.isFile()) {
			if (/(.*)\.(js)/.test(file)) {
				require(newPath);
			}
		// 如果是文件夹则继续遍历
		}else if (stat.isDirectory()) {
			walk(newPath);
		}
	});
};

walk(models_path);

var initialize = function () {
	mongoose.model("User").find(null, function (err, doc) {
		if (err) {
			console.log(err)
		} else if (!doc.length) {
			console.log('Database opens for the first time...')
			Promise.all(init.map(item => {
				let Models = mongoose.model(item.type);
				Models(item).save();
			}))
			.then(() => console.log('Initialize successfully.'))
			.catch(() => console.log('Something went wrong during initializing.'))
		}
	})
}

db.on('error', function () {
	console.log('Database connection error.')
})

db.once('open', function () {
	console.log('The database has connected.')
	initialize()
})

var routes = require('./routes/routes');
routes(app);

var server = http.createServer(app);
server.listen(app.get('port'));

server.on('listening', function(){
	console.log('----------listening on port: ' + app.get('port') +'----------------------');
});

server.on('error', function(error){
	switch (error.code) {
		case 'EACCES':
			console.error(bind + '需要权限许可');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + '端口已被占用');
			process.exit(1);
			break;
		default:
			throw error;
	}
});
