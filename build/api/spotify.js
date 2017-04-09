'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.spotifySearch = undefined;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _track = require('../models/track');

var _track2 = _interopRequireDefault(_track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants

var spotifyAPIRoot = "https://api.spotify.com/v1";

// Functions

// Models

// Requirements

var spotifySearch = exports.spotifySearch = function spotifySearch(searchQuery) {

	return (0, _q2.default)().then(function () {

		if (!searchQuery) {
			throw new Error("Search query required.");
		}

		var url = spotifyAPIRoot + "/search?query=" + searchQuery + "&type=track";

		console.log(url);

		return _axios2.default.get(url, {

			responseType: 'json'

		});
	}).then(function (response) {

		if (!(response.data.tracks && response.data.tracks.items)) {
			throw new Error("No results found.");
		}

		return response.data.tracks.items.map(function (el) {
			return new _track2.default(el);
		});
	}, function (err) {

		throw err;
	}).then(function (tracks) {

		return { success: true, tracks: tracks };
	}).catch(function (err) {

		return { success: false, error: err.message };
	});
};