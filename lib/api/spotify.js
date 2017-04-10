// Requirements

import Q from 'q';
import axios from 'axios';

// Models

import Track from '../models/track';

// Constants

const spotifyAPIRoot = "https://api.spotify.com/v1";

// Functions

export const spotifySearch = function(searchQuery) {

	return Q().then(function () {

		if (!searchQuery) { throw new Error("Search query required."); }

		const url = spotifyAPIRoot + "/search?query=" + searchQuery + "&type=track";		

		return axios.get(url, {

			responseType: 'json'

		});

	}).then(function (response) {

		if (!(response.data.tracks && response.data.tracks.items)) { throw new Error("No results found."); }

		return response.data.tracks.items.map(function (el) { return new Track(el); });

	}, function (err) {

		throw err;

	}).then(function (tracks) {
		
		return {success: true, tracks: tracks};

	}).catch(function (err) {

		return {success: false, error: err.message};

	});

}