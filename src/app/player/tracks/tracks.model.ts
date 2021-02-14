export class Tracks {
    private name:string;
    private id:number;
    private duration;
    private artist;
    private uri:string;
    private image: string;
    private type:string;


    constructor(name:string,id:number,duration,artist,uri:string,image:string,type:string){
    this.name=name;
    this.id=id;
    this.duration=duration;
    this.artist=artist;
    this.uri=uri;
    this.image=image;
    this.type=type;
    }
 }