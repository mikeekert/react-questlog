interface Platform {
    abbreviation: string;
}

export class IGames {
    constructor(
        public _id: number,
        public name: string,
        public primaryImage: string,
        public platforms: Platform[],
        public releaseDateFormatted: string,
        public coverUrl: string
    ) {
        this._id = _id;
        this.name = name;
        this.primaryImage = primaryImage;
        this.platforms = platforms;
        this.releaseDateFormatted = releaseDateFormatted;
        this.coverUrl = coverUrl
    }
}
