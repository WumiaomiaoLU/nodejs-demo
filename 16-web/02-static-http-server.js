#!/usr/bin/node
// 02-static-http-server.js

var http = require('http');
var fs = require('fs');

var root = __dirname + '/' + (process.argv[2] || 'www');
console.log('root:', root);

http.createServer(function(req, res) {
  var url = 'http://' + req.headers.host + req.url;

  console.log('URL:', url);
  console.log(req.headers);
  console.log('')

  var fileName = root + req.url;
  fs.createReadStream(fileName).pipe(res);
}).listen(8000);
