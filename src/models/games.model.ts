interface IPlatform {
    name: string;
    abbreviation: string;
}

export class IGames {
    public id: number;
    public name: string;
    public screenshots: IImage[];
    public artworks: IImage[];
    public primaryImage: string;
    public cover: IImage;
    public platforms: IPlatform[];
    public first_release_date: number;
    public releaseDateFormatted: string;

    constructor(
        id: number,
        name: string,
        screenshots: IImage[],
        artworks: IImage[],
        primaryImage: string,
        platforms: IPlatform[],
        releaseDateFormatted: string,
        cover: IImage,
    ) {
        this.id = id;
        this.name = name;
        this.screenshots = screenshots;
        this.artworks = artworks;
        this.primaryImage = primaryImage;
        this.platforms = platforms;
        this.releaseDateFormatted = releaseDateFormatted;
        this.cover = cover;
    }
}

interface IImage {
    game: number;
    height: number;
    id: number;
    image_id: string;
    url: string;
    width: number;
}
