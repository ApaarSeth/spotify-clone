export class Album {
   private name:string;
   private releaseDate:Date;
   private id:number;
   private image:string;
   private artist:string[];
   private type:string;
   constructor(name:string,releaseDate:Date,id:number,image:string,artist:string[],type:string){
   this.name=name;
   this.releaseDate=releaseDate;
   this.id=id;
   this.image=image;
   this.artist=artist;
   this.type=type;
   }
}