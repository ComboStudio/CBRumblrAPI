// Requirements

import express from 'express';

// Constants

const router = express.Router();

// API

import { sonosPlayURI } from '../api/sonos';
import { spotifySearch } from '../api/spotify';

// Routes

router.post('/play/:trackId', function (req, res) {

	sonosPlayURI(req.params.trackId).then(function (json) {

		res.json(json);

	});

});

router.get('/search/:searchQuery', function (req, res) {

	spotifySearch(req.params.searchQuery).then(function (json) {

		res.json(json);

	});

});

export default router;