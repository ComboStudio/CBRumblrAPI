// Requirements

import express from 'express';

// Constants

const router = express.Router();

// API

import { sonosPlayURI } from '../api/sonos';
import { spotifySearch } from '../api/spotify';

// Routes

router.post('/play/:trackId', (req, res) => {
	sonosPlayURI(req.params.trackId)
  res.json({success: true});
});

router.get('/search/:searchQuery', function (req, res) {

	spotifySearch(req.params.searchQuery).then(function (json) {

		res.json(json);

	});

});

export default router;