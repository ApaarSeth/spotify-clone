import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyPlayerService } from '../spotify-player.service';
import { SpotifyPlaybackSdkServiceService } from '../spotify-playback-sdk-service.service';

declare global {
  interface window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
  }
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  fragmentsArr = [];
  fragmentValues = {};
  constructor(private spotifySdkPlayer: SpotifyPlaybackSdkServiceService,private router:Router, private route: ActivatedRoute, private spotifyPlayer: SpotifyPlayerService) { }
  authToken = "";
  ngOnInit() {
    if (this.route.snapshot.fragment){
      this.fragmentsArr = this.route.snapshot.fragment.split("&");
    for (let item of this.fragmentsArr) {
      let arr = item.split("=");
      this.fragmentValues[arr[0]] = arr[1];
    }
    this.spotifyPlayer.authToken = this.fragmentValues["access_token"];
    // this.spotifyPlayer.getCurrentPlayback();
    // this.spotifyPlayer.getNewlyReleased();
        this.router.navigate(['newReleasedAlbums'],{ relativeTo: this.route})
        this.spotifySdkPlayer.addSpotifyPlaybackSdk();
  }
  
    // console.log(this.fragmentValues);
    // console.log(this.fragmentValues["access_token"]);

  }

}
