// Requirements

import Q from 'q';
import Sonos from 'sonos';

const sonos = new Sonos.Sonos('10.6.2.4');

export const sonosCurrentTrack = function () {

	return Q().then(function () {

		const deferred = Q.defer();

		sonos.currentTrack(function (err, track) {

			if (err) { deferred.reject(err); return }
			deferred.resolve(track);

		});

		return deferred.promise;

	}).then(function (track) {

		return {success: true, track: track};

	}, function (err) {

		throw err;

	}).catch(function (err) {

		return {success: false, error: err.message};

	});


}

export const sonosPlayURI = function (uri) {

	return Q().then(function () {

		if (!uri) { throw new Error("No URI supplied."); }

		const deferred = Q.defer();

		// Add Spotify track to the queue next...

		sonos.addSpotifyQueue(uri, function (err, result) {

			if (err) { deferred.reject(err); return; }
			deferred.resolve(result);

		});

		return deferred.promise;

	}).then(function (result) {

		const deferred = Q.defer();
	
		// ...then just skip to that queued track immediately. 
		// Fuck the haters.

		sonos.next(function (err, success) {

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