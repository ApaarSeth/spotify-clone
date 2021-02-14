import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Album } from './album.model';

@Component({
  selector: 'app-new-released-albums',
  templateUrl: './new-released-albums.component.html',
  styleUrls: ['./new-released-albums.component.css']
})
export class NewReleasedAlbumsComponent implements OnInit {

  album:Album[]=[];
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.route.snapshot.data);
    
  this.route.data.subscribe(data=>{
    let items=data.albums.albums.items
    // console.log(items) 
    for (let item of items){
      let artistName=[];
      for(let artist of item.artists)
          artistName.push(artist.name);
      // console.log(item)    
      // console.log(item.name,item.release_date,item.id,item.images[1].url,artistName)
       this.album.push(new Album(item.name,item.release_date,item.id,item.images[1].url,artistName,item.type))
    }
  })

  }

  showTracks(id)
  
  {}

}
