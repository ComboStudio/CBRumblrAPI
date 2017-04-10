'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sonos = require('../api/sonos');

var _spotify = require('../api/spotify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants

var router = _express2.default.Router();

// API

// Requirements

// Routes

router.post('/play/:trackId', _sonos.sonosFetchActiveSonosMiddleware, function (req, res) {

	(0, _sonos.sonosPlayURI)(req.params.trackId).then(function (json) {

		res.json(json);
	});
});

router.get('/search/:searchQuery', function (req, res) {

	(0, _spotify.spotifySearch)(req.params.searchQuery).then(function (json) {

		res.json(json);
	});
});

exports.default = router;