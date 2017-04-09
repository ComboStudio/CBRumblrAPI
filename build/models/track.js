"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function Track(obj) {
	_classCallCheck(this, Track);

	this.id = obj.id;
	this.title = obj.name;
	this.artworkURL = obj.album && obj.album.images && obj.album.images.length > 0 && obj.album.images[0].url;
	this.artist = obj.artists && obj.artists.length > 0 && obj.artists[0].name;
};

exports.default = Track;