import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';

import { sonosCurrentTrack, sonosPlayURI } from './api/sonos';

var app = express();
var server = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('public')));

const port = process.env.PORT || 3000;
server.listen(port);

app.post('/play/spotify/:trackId', function (req, res) {

	sonosPlayURI(req.params.trackId).then(function (json) {

		res.json(json);

	});

});

export default app;