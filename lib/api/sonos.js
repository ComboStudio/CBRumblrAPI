// Requirements

import Q from 'q';
import Sonos from 'sonos';

// Cached Sonos instance

var resolvedSonos;

// Constants

const sonosSearchTimeout = 6 * 1000;
const sonosTurnItUpVolume = 50;

// Private

function getSonos() {

	if (process.env.SONOS_IP) { return new Sonos.Sonos(process.env.SONOS_IP); }
	else { return resolvedSonos; }

};

// Public

export const sonosCurrentState = function () {

	return Q().then(function () {

		if (!getSonos()) { throw new Error("Failed to connect to Sonos."); }

		const deferred = Q.defer();

		getSonos().getCurrentState(function (err, track) {

			if (err) { deferred.reject(err); return }
			deferred.resolve(track);

		});

		return deferred.promise;

	}).then(function (track) {

		return {success: true, result: track};

	}, function (err) {

		throw err;

	}).catch(function (err) {

		return {success: false, error: err.message};

	});


}

export const sonosCurrentTrack = function () {

	return Q().then(function () {

		if (!getSonos()) { throw new Error("Failed to connect to Sonos."); }

		const deferred = Q.defer();

		getSonos().currentTrack(function (err, track) {

			if (err) { deferred.reject(err); return }
			deferred.resolve(track);

		});

		return deferred.promise;

	}).then(function (track) {

		return {success: true, result: track};

	}, function (err) {

		throw err;

	}).catch(function (err) {

		return {success: false, error: err.message};

	});


}

export const sonosSeekToSeconds = function (seconds) {

	return Q().then(function () {

		if (!getSonos()) { throw new Error("Failed to connect to Sonos."); }
		if (!seconds) { throw new Error("No seconds supplied."); }

		const deferred = Q.defer();

		getSonos().seek(seconds, function (err, result) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		});

		return deferred.promise;

	}, function (err) {

		throw err;

	}).catch(function (err) {

		return {success: false, error: err.message};

	});

}

export const sonosPlayURI = function (uri) {

	return Q().then(function () {

		if (!getSonos()) { throw new Error("Failed to connect to Sonos."); }
		if (!uri) { throw new Error("No URI supplied."); }

		// Make sure the queue is currently selected...

		const deferred = Q.defer();

		getSonos().selectQueue(function (err, result) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		});

		return deferred.promise;

	}).then(function (success) {

		// Add Spotify track to the queue next...

		const deferred = Q.defer();

		getSonos().addSpotifyQueue(uri, function (err, result) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		}, 1);

		return deferred.promise;

	}, function (err) {

		throw err;

	}).then(function (result) {

		const deferred = Q.defer();

		// ...then just skip to that queued track immediately. 

		getSonos().selectTrack(1, function (err, success) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		});

		return deferred.promise;

	}, function (err) {

		throw err;

	}).then(function (result) {

		const deferred = Q.defer();

		// ...and start playing. Breathe.

		getSonos().play(function (err, success) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		});

		return deferred.promise;

	}, function (err) {

		throw err;

	}).then(function (result) {

		const deferred = Q.defer();

		// Turn it up...

		getSonos().setVolume(sonosTurnItUpVolume, function (err, result) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		});

		return deferred.promise;

	}, function (err) {

		throw err;

	}).then(function (result) {

		return {success: true, result: result};

	}, function (err) {

		throw err;

	}).catch(function (err) {

		return {success: false, error: err.message};

	});

}

export const sonosFetchActiveSonosMiddleware = function (req, res, next) {

	if (getSonos()) {

		return next();

	}

	return Q().then(function () {

		const deferred = Q.defer();

		Sonos.search({timeout: sonosSearchTimeout}, function (device) {

			if (device) { deferred.resolve(device); return; }
			else { deferred.reject(new Error("Unknown error occured when searching for Sonos.")); return; }

		});

		return deferred.promise.timeout(sonosSearchTimeout);

	}).then(function (discoveredSonos) {

		resolvedSonos = discoveredSonos;
		return next();

	}, function (err) {

		throw err;

	}).catch(function (err) {

		return res.json({success: false, error: "No Sonos system found."});

	});

}