import {
    BadRequestException,
    Body,
    CacheInterceptor,
    CacheTTL,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HowLongToBeatEntry } from 'howlongtobeat/src/main/howlongtobeat';
import { Observable } from 'rxjs';
import { GamesDto } from '../../models/games.dto';
import { GamesService } from '../../services/games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gameService: GamesService) {
    }

    @Get('')
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(360000)
    searchGamesByName(@Query('n') name: string): Observable<AxiosResponse> {
        if (name) {
            return this.gameService.searchGamesByName(name);
        } else {
            throw new BadRequestException();
        }
    }

    @Post('')
    async addGame(@Body('game') game: GamesDto): Promise<GamesDto> {
        if (game) {
            return await this.gameService.insertGame(game);
        } else {
            throw new BadRequestException();
        }
    }

    @Delete()
    deleteGameForUser(@Body() {gid}): Promise<GamesDto> {
        if (gid) {
            return this.gameService.deleteUserGameByGameId(gid);
        } else {
            throw new BadRequestException();
        }
    }

    @Get('id')
    searchGameById(@Query('gid') gid: string): Promise<GamesDto> {
        if (gid) {
            return this.gameService.searchGameById(gid);
        } else {
            throw new BadRequestException();
        }
    }

    @Put('id')
    updateGameById(@Query('gid') gid: string,
                   @Body('game') game: GamesDto): Promise<GamesDto> {
        if (gid && game) {
            return this.gameService.updateGameById(gid, game)
        } else {
            throw new BadRequestException();
        }
    }

    @Get('hltb')
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(360000)
    searchHltbByName(@Query('n') name: string): HowLongToBeatEntry[] {
        if (name) {
            return this.gameService.searchHltbByName(name);
        } else {
            throw new BadRequestException();
        }
    }

    @Get('/all')
    getAllGamesForUser(@Query('uid') uid: string): Promise<GamesDto[]> {
        if (uid) {
            return this.gameService.getAllGamesForUser(uid);
        } else {
            throw new BadRequestException();
        }
    }
}
