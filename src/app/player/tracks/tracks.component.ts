import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyPlayerService } from 'src/app/spotify-player.service';
import { Tracks } from './tracks.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  tracks = [];
  id: string;
  type: string;
  image: string;

  constructor(private router: Router, private route: ActivatedRoute, private spotifyService: SpotifyPlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];
      this.image = params['image'];
    });
    console.log(this.type);
    if (this.type === "album"){
      this.spotifyService.getAlbumTracks(this.id).subscribe((tracks) => {
        console.log(tracks['items'])
        this.tracks = tracks['items'];
      });
    }
      else{
        this.spotifyService.getTrack(this.id).subscribe((tracks) => {
          console.log(tracks)
          console.log(tracks['items'])
          this.tracks.push(tracks);
        });
      }
  }

  getArtist(track) {
    let artistName = [];
    for (let artist of track.artists)
      artistName.push(artist.name);
    return artistName.toString();
  }

  goToNewlyReleasesAlbum() {
    this.router.navigate(['newReleasedAlbums'], { relativeTo: this.route.parent })
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  playTracks(track: []) {
    // console.log(track)
    for(let track of this.tracks)
    track['image']=this.image;
    this.spotifyService.track.next(track);
  }
}
