export class Artist {
    private name: string;
    private image: string;
    private genere: [];
    private type: string;
    private id: string;
    constructor(name: string, image: string, genere: [], type: string, id: string) {
        this.name = name;
        this.image = image;
        this.genere = genere;
        this.type = type;
        this.id = id;
    }
}