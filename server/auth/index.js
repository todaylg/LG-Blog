var jwt =require('jsonwebtoken');
var secret = require('./config').jwt;

// 检查token是否正确
var confirmToken = (req, res, next) => {
	console.log("begin confirmToken");
	if (!req.headers.authorization) {
		console.log("no token");
		return res.status(401).end('no token');
	} else {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, function (err) {
            if (err) {
                console.log("token error");
                console.log("err.message:"+err.message);
                 return res.status(401).end(err.message);
            }
        })
    }
    next();
}

module.exports = confirmToken;
