"use strict";

var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');      
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');// session依赖cookie模块
var mongoose = require('mongoose'); 
var mongoStore = require('connect-mongo')(session);// 对session进行持久化--存数据库
var init = require('./init.json');       

var settings = require('./settings');
var app = express();
var port = process.env.PORT || 3000;

var dbUrl = 'mongodb://localhost/lgBlog';// 数据库地址

//首先连接本地数据库(基本模块加载)
mongoose.connect(dbUrl);
var db = mongoose.connection;
//mongoose promise 风格
mongoose.Promise = global.Promise;

app.set('port',port);
app.use(express.static(path.join(__dirname, '../dist')));//入口
app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));////返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

// models loading
var models_path = path.join(__dirname, 'models');// 模型所在路径

//路径加载函数，加载各模型的路径,所以可以直接通过mongoose.model加载各模型 这样即使模型路径改变也无需更改路径
var walk = function(path) {
	fs 
	.readdirSync(path)	//同步版的返回文件名数组，其中不包括 '.' 和 '..' 目录.readdir 读取 path 路径所在目录的内容。 回调函数 (callback) 接受两个参数 (err, files) 其中 files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'。
	.forEach(function(file) {//参数file是哪里来的？readdirSync的返回值？有点猛啊
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);//同步版的,回调函数（callback） 接收两个参数： (err, stats) ，其中 stats 是一个 fs.Stats 对象。 详情请参考 fs.Stats
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
			Promise.all(init.map(item => new Models[item.type](item).save()))
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
