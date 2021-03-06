#!/usr/bin/node
var server = require('http').createServer();
var assert = require('assert');

server.on('request', function (req, res) {
  console.log(req.headers);

  switch(req.url) {
    case '/':
      sendNormalMsg(res);
      break;

    case '/admin':
      sendSecretMsg(req, res);
      break;

    default:
      sendErrorMsg(res); 
  }
});

server.listen(8080);

function userNamePasswd(str) {
  var msg = str.split(' ');
  assert.equal(msg.length, 2, 'must to be 2');
  assert.equal(msg[0], 'Basic', 'must to be Basic');

  var account = Buffer.from(msg[1], 'base64');
  msg = account.toString('utf8').split(':');

  return {
    userName: msg[0],
    passWord: msg[1]
  };
}

function sendNormalMsg(res) {
  res.end('Good day!');
}

function sendSecretMsg(req, res) {
  if(req.headers.authorization) {
    console.log('auth:', userNamePasswd(req.headers.authorization));
    res.end('OK! my mobile: 13582027613');
  } else {
    res.writeHead(401, {'WWW-Authenticate': 'Basic'});
    res.end('who you are?');
  }
}

function sendErrorMsg(res) {
  res.statusCode = 404;
  res.end('404 Error, resource not found!');
}
