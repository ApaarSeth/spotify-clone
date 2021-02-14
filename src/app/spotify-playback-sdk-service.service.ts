import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyPlayerService } from './spotify-player.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/// <reference path="../node_modules/@types/spotify-web-playback-sdk/index.d.ts"/>

declare global {
  interface window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackSdkServiceService {
  private player: Spotify.SpotifyPlayer;;
  private deviceId: string;
  private state: Spotify.PlaybackState;
  private subjectPlayState = new BehaviorSubject<Spotify.PlaybackState>(null);
  private subjectTrackEnded = new BehaviorSubject<boolean>(false);
  playStatusTimerId: string;
  constructor(private http: HttpClient, private spotifyService: SpotifyPlayerService, private zone: NgZone) { }
  addSpotifyPlaybackSdk() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    script.addEventListener('load', (e) => {
      console.log(e);
    });
    document.head.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {

      console.log('The Web Playback SDK is ready. We have access to Spotify.Player');

      this.player = new Spotify.Player({
        name: 'Apaar',
        getOAuthToken: (callback) => {
          callback(this.spotifyService.authToken);
        }
      });

      if (this.player) {
        this.spotifyService.player = this.player;
        this.player.connect().then((res) => {
          console.log(`res ${res}`);
        });
      }

      this.player.on('ready', (data) => {
        console.log('Ready with Device ID', data.device_id);
        this.spotifyService.deviceId = data.device_id;
        this.deviceId = data.device_id;
        this.spotifyService.deviceId = this.deviceId;
        this.spotifyService.transferPlayback();
      });

      this.player.addListener('player_state_changed', (state) => {
        console.log(state);
        if (
          this.state &&
          state.track_window.previous_tracks.find((x) => x.id === state.track_window.current_track.id) &&
          !this.state.paused &&
          state.paused
        ) {
          console.log('Track ended');
          // this.zone.run(x => this.setTrackEnd(true));
        }
        this.state = state;
      });
    };

  }

  setPlayState(state: Spotify.PlaybackState) {
    this.state = state;
    this.subjectPlayState.next(state);
  }
  getPlayStatus(): Observable<Spotify.PlaybackState> {
    return this.subjectPlayState.asObservable();
  }
  setTrackEnd(trackEnd: boolean) {
    this.subjectTrackEnded.next(trackEnd);
  }
  getTrackEnd(): Observable<boolean> {
    return this.subjectTrackEnded.asObservable();
  }

  callback() {
    this.player.getCurrentState().then((state) => {
      this.zone.run(x => this.setPlayState(state));
    });
  }
}
