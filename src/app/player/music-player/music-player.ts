import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SpotifyPlayerService } from 'src/app/spotify-player.service';
import { Tracks } from '../tracks/tracks.model';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer: ElementRef;
  isPlaying = false;
  searchStr="";
  showAlbum = true;
  audio;
  uri: string;
  track:[];
  constructor(private elementRef: ElementRef,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyPlayerService) {

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

  ngOnInit() {
    // this.spotifyService.currentlyPlaying().subscribe(track=>{
    //   console.log("track")
    //   console.log(track)
    // })
    // this.spotifyService.uri.subscribe(uri=>{
    //   this.uri=uri;   
    //  })
    this.spotifyService.track.subscribe(track => {
      if(track){
      console.log(track)
      this.track=track;
      console.log(this.track['artists'])
      this.uri=track['uri'];  
      this.playSong();
      }
    })
  }

  getArtist() {
    let artistName = [];
    for (let artist of this.track['artists'])
      artistName.push(artist.name);
    return artistName.toString();
  }

  getImage() {
    return this.isPlaying ? 'assets/images/pause.png' : 'assets/images/play.png'
  }

  showAlbums() {
    this.showAlbum = false;
    this.router.navigate(['newReleasedAlbums'], { relativeTo: this.route })
  }

  playSong() {
      this.spotifyService.playTrack(this.uri);
      // this.audio = new Audio();
      // this.audio.src = this.uri;
      // this.audio.play();
      this.isPlaying = true;
  }

  pauseSong() {
    this.spotifyService.pauseTrack();
    // this.audio.pause();
    this.isPlaying = false;
  }

  playPreviousSong() {
    this.spotifyService.playPreviousSong();
  }

  playNextSong() {
    this.spotifyService.playNextSong();
    // console.log('res')
  }
  
}
