var jwt =require('jsonwebtoken');
// var secret = require('../../config').jwt
var secret = "123";

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
                 return res.status(401).end(err.message);
            }
        })
    }
    console.log("token ok!");
    next();
}

module.exports = confirmToken;
