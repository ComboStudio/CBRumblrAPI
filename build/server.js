'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _spotify = require('./routes/spotify');

var _spotify2 = _interopRequireDefault(_spotify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Routes

var server = _http2.default.Server(app);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.resolve('public')));

// Routing

app.use('/spotify', _spotify2.default);

// Server start

server.listen(process.env.PORT || 3000);

exports.default = app;