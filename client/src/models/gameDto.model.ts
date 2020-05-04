export interface GameDtoModel {
    _id: string;
    name: string;
    hoursPlayed: number;
    hoursToFinish: number;
    platform: string;
    completed: boolean;
    nowPlaying: boolean;
    uid: string;
    coverUrl: string;
    releaseDate: string;
}
