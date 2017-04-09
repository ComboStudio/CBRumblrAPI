export default class Track {

	constructor(obj) {
		
		this.id = obj.id;
		this.title = obj.name;
		this.artworkURL = obj.album && obj.album.images && obj.album.images.length > 0 && obj.album.images[0].url;
		this.artist = obj.artists && obj.artists.length > 0 && obj.artists[0].name;

	}

}