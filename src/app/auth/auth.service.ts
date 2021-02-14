import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = "https://accounts.spotify.com/authorize?"
  clientId = "e86426a19d63411b9c809f375783f30d"
   redirectUri = "https://imawesome007.github.io/spotify-clone/player"
  //  redirectUri = "http://localhost:4200/player"
  scope = "user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-read-recently-played  app-remote-control"

  authorizeSpotify() {
    window.location.href=
    this.baseUrl + "client_id=" + this.clientId + "&redirect_uri=" + this.redirectUri + "&scope=" + this.scope+"&response_type=token";  
    // return this.http.get(this.baseUrl + "client_id=" + this.clientId + "&redirect_uri=" + this.redirectUri + "&scope=" + this.scope+"&response_type=token");
  }


   
  
}
