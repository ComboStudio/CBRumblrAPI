'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sonosPlayURI = exports.sonosSeekToSeconds = exports.sonosTurnItUp = exports.sonosCurrentTrack = undefined;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _sonos = require('sonos');

var _sonos2 = _interopRequireDefault(_sonos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants

// Requirements

var sonos = new _sonos2.default.Sonos(process.env.SONOS_IP);
var defaultTurnItUpVolume = 60;

// Functions

var sonosCurrentTrack = exports.sonosCurrentTrack = function sonosCurrentTrack() {

	return (0, _q2.default)().then(function () {

		if (!sonos) {
			throw new Error("Failed to connect to Sonos.");
		}

		var deferred = _q2.default.defer();

		sonos.currentTrack(function (err, track) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(track);
		});

		return deferred.promise;
	}).then(function (track) {

		return { success: true, result: track };
	}, function (err) {

		throw err;
	}).catch(function (err) {

		return { success: false, error: err.message };
	});
};

var sonosTurnItUp = exports.sonosTurnItUp = function sonosTurnItUp() {

	return (0, _q2.default)().then(function () {

		if (!sonos) {
			throw new Error("Failed to connect to Sonos.");
		}
		if (!seconds) {
			throw new Error("No seconds supplied.");
		}

		var deferred = _q2.default.defer();

		sonos.setVolume(defaultTurnItUpVolume, function (err, result) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}, function (err) {

		throw err;
	}).then(function (result) {

		return { success: true, result: result };
	}).catch(function (err) {

		return { success: false, error: err.message };
	});
};

var sonosSeekToSeconds = exports.sonosSeekToSeconds = function sonosSeekToSeconds(seconds) {

	return (0, _q2.default)().then(function () {

		if (!sonos) {
			throw new Error("Failed to connect to Sonos.");
		}
		if (!seconds) {
			throw new Error("No seconds supplied.");
		}

		var deferred = _q2.default.defer();

		sonos.seek(seconds, function (err, result) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}, function (err) {

		throw err;
	}).catch(function (err) {

		return { success: false, error: err.message };
	});
};

var sonosPlayURI = exports.sonosPlayURI = function sonosPlayURI(uri) {

	return (0, _q2.default)().then(function () {

		if (!sonos) {
			throw new Error("Failed to connect to Sonos.");
		}
		if (!uri) {
			throw new Error("No URI supplied.");
		}

		// Make sure the queue is currently selected...

		var deferred = _q2.default.defer();

		sonos.selectQueue(function (err, result) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}).then(function (success) {

		// Add Spotify track to the queue next...

		var deferred = _q2.default.defer();

		sonos.addSpotifyQueue(uri, function (err, result) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}, function (err) {

		throw err;
	}).then(function (result) {

		var deferred = _q2.default.defer();

		// ...then just skip to that queued track immediately. 
		// Fuck the haters.

		sonos.next(function (err, success) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}, function (err) {

		throw err;
	}).then(function (result) {

		var deferred = _q2.default.defer();

		// ...and start playing. Breathe.

		sonos.play(function (err, success) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}, function (err) {

		throw err;
	}).then(function (result) {

		return { success: true, result: result };
	}, function (err) {

		throw err;
	}).catch(function (err) {

		return { success: false, error: err.message };
	});
};