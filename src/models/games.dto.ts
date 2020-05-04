import * as mongoose from 'mongoose';

export const GamesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hoursPlayed: {type: Number},
    hoursToFinish: {type: Number},
    platform: {type: String},
    completed: {type: Boolean},
    nowPlaying: {type: Boolean},
    uid: {type: String},
    coverUrl: {type: String},
    releaseDate: {type: String}
});

export class GamesDto extends mongoose.Document {
    _id: string;
    name: string;
    hoursPlayed: number;
    hoursToFinish: number;
    platform: string;
    completed: boolean;
    nowPlaying: boolean;
    coverUrl: string;
    releaseDate: string;
    uid: string;
}
