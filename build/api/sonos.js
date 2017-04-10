'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sonosFetchActiveSonosMiddleware = exports.sonosPlayURI = exports.sonosSeekToSeconds = exports.sonosCurrentTrack = exports.sonosCurrentState = undefined;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _sonos = require('sonos');

var _sonos2 = _interopRequireDefault(_sonos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Cached Sonos instance

// Requirements

var resolvedSonos;

// Constants

var sonosSearchTimeout = 6 * 1000;
var sonosTurnItUpVolume = 50;

// Private

function getSonos() {

	if (process.env.SONOS_IP) {
		return new _sonos2.default.Sonos(process.env.SONOS_IP);
	} else {
		return resolvedSonos;
	}
};

// Public

var sonosCurrentState = exports.sonosCurrentState = function sonosCurrentState() {

	return (0, _q2.default)().then(function () {

		if (!getSonos()) {
			throw new Error("Failed to connect to Sonos.");
		}

		var deferred = _q2.default.defer();

		getSonos().getCurrentState(function (err, track) {

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

var sonosCurrentTrack = exports.sonosCurrentTrack = function sonosCurrentTrack() {

	return (0, _q2.default)().then(function () {

		if (!getSonos()) {
			throw new Error("Failed to connect to Sonos.");
		}

		var deferred = _q2.default.defer();

		getSonos().currentTrack(function (err, track) {

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

var sonosSeekToSeconds = exports.sonosSeekToSeconds = function sonosSeekToSeconds(seconds) {

	return (0, _q2.default)().then(function () {

		if (!getSonos()) {
			throw new Error("Failed to connect to Sonos.");
		}
		if (!seconds) {
			throw new Error("No seconds supplied.");
		}

		var deferred = _q2.default.defer();

		getSonos().seek(seconds, function (err, result) {

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

		if (!getSonos()) {
			throw new Error("Failed to connect to Sonos.");
		}
		if (!uri) {
			throw new Error("No URI supplied.");
		}

		// Make sure the queue is currently selected...

		var deferred = _q2.default.defer();

		getSonos().selectQueue(function (err, result) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	}).then(function (success) {

		// Add Spotify track to the queue next...

		var deferred = _q2.default.defer();

		getSonos().addSpotifyQueue(uri, function (err, result) {

			if (err) {
				deferred.reject(err);return;
			}
			deferred.resolve(result);
		}, 1);

		return deferred.promise;
	}, function (err) {

		throw err;
	}).then(function (result) {

		var deferred = _q2.default.defer();

		// ...then just skip to that queued track immediately. 

		getSonos().selectTrack(1, function (err, success) {

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

		getSonos().play(function (err, success) {

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

		// Turn it up...

		getSonos().setVolume(sonosTurnItUpVolume, function (err, result) {

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

		console.log(err);

		return { success: false, error: err.message };
	});
};

var sonosFetchActiveSonosMiddleware = exports.sonosFetchActiveSonosMiddleware = function sonosFetchActiveSonosMiddleware(req, res, next) {

	if (getSonos()) {

		return next();
	}

	return (0, _q2.default)().then(function () {

		var deferred = _q2.default.defer();

		_sonos2.default.search({ timeout: sonosSearchTimeout }, function (device) {

			if (device) {
				deferred.resolve(device);return;
			} else {
				deferred.reject(new Error("Unknown error occured when searching for Sonos."));return;
			}
		});

		return deferred.promise.timeout(sonosSearchTimeout);
	}).then(function (discoveredSonos) {

		resolvedSonos = discoveredSonos;
		return next();
	}, function (err) {

		throw err;
	}).catch(function (err) {

		return res.json({ success: false, error: "No Sonos system found." });
	});
};