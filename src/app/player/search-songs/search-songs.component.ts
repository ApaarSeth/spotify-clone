import { Component, OnInit } from '@angular/core';
import { SpotifyPlayerService } from '../../spotify-player.service';
import { Album } from '../new-released-albums/album.model';
import { Tracks } from '../tracks/tracks.model';
import { Artist } from '../artist.model';

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.css']
})
export class SearchSongsComponent implements OnInit {
  searchStr: string = "";
  constructor(private spotifyService: SpotifyPlayerService) { }

  albums = [];
  tracks = [];
  artists = [];
  image: string;

  ngOnInit() {
  }

  getSearchStr() {
    // console.log(this.searchStr.length>0?true:false);
    return this.searchStr.length > 0 ? true : false;
  }

  searchMusic() {
    let limit = 5;
    this.spotifyService.searchMusic(encodeURI(this.searchStr), limit).subscribe(data => {
      console.log(data)
      this.albums = data['albums'].items;
      this.artists = data['artists'].items;
      this.tracks = data['tracks'].items;

      // console.log(this.albums);
    });
  }


  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  getAlbumImage(album) {
    let albumImage = "";
    if (album.images.length > 0)
      albumImage = album.images[0].url;
    return albumImage;
  }

  getTrackImage(track) {
    let trackImage = "";
    if (track.album.images.length > 0)
      trackImage = track.album.images[0].url;
    return trackImage;
  }

  playTracks() {

  }
}

