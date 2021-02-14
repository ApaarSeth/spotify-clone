import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, exhaustMap, take } from 'rxjs/operators';
import { Album } from './player/new-released-albums/album.model';
import { Subject } from 'rxjs';
import { SpotifyPlaybackSdkServiceService } from './spotify-playback-sdk-service.service';
import { Tracks } from './player/tracks/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {
  deviceId: string;
  track = new Subject<[]>();
  constructor(private http: HttpClient) { }
  authToken: string;
  player;

  getCurrentPlayback() {

    return this.http.get("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    }).subscribe((data: Response) => {
      console.log("currentPlayback")
      console.log(data)
    })

  }

  transferPlayback() {
    return this.http.put("https://api.spotify.com/v1/me/player", {
      "device_ids": [this.deviceId]
    }, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      // }).subscribe((data) => {
      //   console.log(data)
       })
  }

  getDevices() {
    return this.http.get("https://api.spotify.com/v1/me/player/devices", {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    }).subscribe((data) => {
      console.log(data)
    })
  }

  getNewlyReleased() {
    console.log(`authToken =${this.authToken}`)
    return this.http.get("https://api.spotify.com/v1/browse/new-releases?country=IN&limit=10", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    })
  }

  getAlbumTracks(id) {
    return this.http.get(`https://api.spotify.com/v1/albums/${id}/tracks?limit=10`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    })
  }
  getTrack(id) {
    return this.http.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`
      }
    })
  }

  currentlyPlaying() {
    return this.http.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    })
  }



  playTrack(uri: string) {
    // this.http.put(`https://api.spotify.com/v1/me/player/play`,
     this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      { uris: [uri] },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        }
      }).toPromise()
     .then((res) => console.log(res))

    // console.log(this.getCurrentPlayback())
    // this.url.next(url);
  }
  playNextTrack() {
    this.player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
    // this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
    //   {},
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${this.authToken}`
    //     }
    //   }).toPromise()
    //  .then((res) => console.log(res))

    // console.log(this.getCurrentPlayback())
    // this.url.next(url);
  }

  pauseTrack() {
    this.http.put(`https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      }).toPromise()
      .then((res) => res)

    // console.log(this.getCurrentPlayback())
    // this.url.next(url);
  }

  playPreviousSong() {
    this.http.post(`https://api.spotify.com/v1/me/player/previous`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      });
    return this.getCurrentPlayback();
  }

  playNextSong() {
    this.player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
    // this.http.post(`https://api.spotify.com/v1/me/player/next`,
    //   {},
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${this.authToken}`
    //     }
    //   });
    // return this.playNextTrack();
  }

  searchMusic(str: string, limit: number) {
    if (str.trim().length > 0) {
      return this.http.get(`https://api.spotify.com/v1/search/?q=${str}&limit=${limit}&type=album,track,artist&market=from_token`,
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`
          }
        })
    }
  }

}
