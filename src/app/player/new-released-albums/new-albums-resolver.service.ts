import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SpotifyPlayerService } from 'src/app/spotify-player.service';
import { Observable } from 'rxjs';
import { Album } from './album.model';

@Injectable({
  providedIn: 'root'
})
export class NewAlbumsResolver implements Resolve<any>{

  constructor(private spotifyPlayer: SpotifyPlayerService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    return this.spotifyPlayer.getNewlyReleased();
  }
}
