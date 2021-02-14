import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { AuthComponent } from './auth/auth.component';
import { NewReleasedAlbumsComponent } from './player/new-released-albums/new-released-albums.component';
import { NewAlbumsResolver } from './player/new-released-albums/new-albums-resolver.service';
import { TracksComponent } from './player/tracks/tracks.component';
import { SearchSongsComponent } from './player/search-songs/search-songs.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: AuthComponent },
  {
    path: "player", component: PlayerComponent, children: [
      {path:"newReleasedAlbums",component: NewReleasedAlbumsComponent,resolve:{albums:NewAlbumsResolver}},
      { path: "tracks/:id/:type/:image", component: TracksComponent },
    ]
  },
  { path: "search", component: SearchSongsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
