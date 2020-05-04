import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import { InjectModel } from '@nestjs/mongoose';
import { format, fromUnixTime } from 'date-fns';
import { HowLongToBeatService } from 'howlongtobeat';
import { HowLongToBeatEntry } from 'howlongtobeat/src/main/howlongtobeat';
import { Model } from "mongoose";
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GamesDto } from '../models/games.dto';
import { IGames } from '../models/games.model';

@Injectable()
export class GamesService {
    constructor(private http: HttpService,
                @InjectModel('Games') private readonly gameModel: Model<GamesDto>) {
    }

    private static prepareData(response: AxiosResponse) {
        function formatDate(game: IGames) {
            game.releaseDateFormatted = game.first_release_date
                ? format(fromUnixTime(game.first_release_date), 'yyyy')
                : null;
        }

        let arrayOfGames = response.data.map((game: IGames) => {
            game = GamesService.prepareScreenShots(game);
            formatDate(game);
            return game;
        });
        arrayOfGames = arrayOfGames.sort(function (a, b) {
            return b.popularity - a.popularity;
        });
        return arrayOfGames;
    }

    private static prepareScreenShots(game: IGames) {
        function extractArtworkUrl() {
            game.artworks = game.artworks
                .filter((artworks) => {
                    return typeof artworks === 'object';
                })
                .map((artworks) => {
                    return {
                        ...artworks,
                        url: artworks.url.replace('thumb', 'screenshot_med'),
                    };
                });
            game.primaryImage = game.artworks[0].url;
        }

        function extractCoverArtUrl() {
            if (game.cover) {
                game.cover.url = game.cover?.url?.replace('thumb', '720p');
            } else {
                game.cover = null;
            }
        }

        function extractScreenshotUrl() {
            game.screenshots = game.screenshots
                .filter((screenshots) => {
                    return typeof screenshots === 'object';
                })
                .map((screenshots) => {
                    return {
                        ...screenshots,
                        url: screenshots.url.replace('thumb', 'screenshot_med'),
                    };
                });
            game.primaryImage = game.screenshots[0].url;
        }

        if (game.hasOwnProperty('artworks')) {
            extractArtworkUrl();
        } else if (game.hasOwnProperty('screenshots')) {
            extractScreenshotUrl();
        }
        extractCoverArtUrl();
        return game;
    }

    private static checkForCompleted(game: GamesDto): boolean {
        return game.hoursPlayed === game.hoursToFinish || game.completed;
    }

    searchGamesByName(name: string): Observable<AxiosResponse> {
        if (name) {
            return this.http
                .get('https://api-v3.igdb.com/games', {
                    headers: {
                        Accept: 'application/json',
                        'user-key': `${process.env.IGDB_API}`,
                    },
                    data: `search "${name}";
          fields screenshots.*, name, first_release_date, platforms.*, artworks.*, time_to_beat.*, cover.*, popularity;
          limit 50;
          where themes != (42);`,
                })
                .pipe(
                    map((response: AxiosResponse) => {
                        if (response.status) {
                            return GamesService.prepareData(response);
                        }
                    }),
                    catchError((err) => {
                        throw new HttpException(err.response.data, err.response.status);
                    }),
                );
        }
    }

    searchHltbByName(name: string): HowLongToBeatEntry[] {
        const hltbService = new HowLongToBeatService();
        return hltbService.search(name).then(function (resp: HowLongToBeatEntry[]) {
            return resp.sort(function (a: HowLongToBeatEntry, b: HowLongToBeatEntry) {
                return b.similarity - a.similarity;
            });
        });
    }

    insertGame(game: GamesDto): Promise<GamesDto> {
        game.completed = GamesService.checkForCompleted(game);
        const newGame: GamesDto = new this.gameModel(game);
        return newGame.save();
    }

    async getAllGamesForUser(uid: string): Promise<GamesDto[]> {
        const games: GamesDto[] = await this.gameModel.find({uid});

        return games.sort((a: GamesDto, b: GamesDto) => {
            return (b.hoursPlayed / b.hoursToFinish) - (a.hoursPlayed / a.hoursToFinish);
            // sort by percentages
        }).sort(function (x, y) {
            return (x.completed === y.completed) ? 0 : x.completed ? 1 : -1;
            // then place completed games at end
        }).sort(function (x, y) {
            return (x.nowPlaying === y.nowPlaying) ? 0 : x.nowPlaying ? -1 : 1;
            // then now playing at top
        });
    }

    deleteUserGameByGameId(gid: string): Promise<GamesDto> {
        return this.gameModel.findByIdAndDelete(gid).exec()
    }

    searchGameById(gid: string): Promise<GamesDto> {
        return this.gameModel.findById(gid).exec();
    }

    updateGameById(gid: string, game: GamesDto): Promise<GamesDto> {
        game.completed = GamesService.checkForCompleted(game);
        return this.gameModel.findByIdAndUpdate(gid, game).exec();
    }
}
