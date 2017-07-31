const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));

app.get('/*', function(req, res) {
  return res.sendFile(__dirname + '/dist/index.html');//打包产出
})

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
})
