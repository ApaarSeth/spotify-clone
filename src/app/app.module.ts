import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlayerComponent } from './player/player.component';
import { MusicPlayerComponent } from './player/music-player/music-player';
import { NewReleasedAlbumsComponent } from './player/new-released-albums/new-released-albums.component';
import { TracksComponent } from './player/tracks/tracks.component';
import { SearchSongsComponent } from './player/search-songs/search-songs.component';
import { HeadersComponent } from './player/headers/headers.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MusicPlayerComponent,
    PlayerComponent,
    NewReleasedAlbumsComponent,
    TracksComponent,
    SearchSongsComponent,
    HeadersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule ,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
