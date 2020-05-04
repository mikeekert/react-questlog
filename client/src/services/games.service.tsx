import { from } from 'rxjs';
import { GameDtoModel } from '../models/gameDto.model';
import AxiosConfig from '../utils/axios';

export function addGameForUser(game: GameDtoModel) {
    return from(AxiosConfig.httpAxios().post(`/games`, {game}));
}

export function getAllGamesForUser(uid: string) {
    return from(AxiosConfig.httpAxios().get(`/games/all?uid=${uid}`));
}

export function getGameById(gid: string) {
    return from(AxiosConfig.httpAxios().get(`/games/id?gid=${gid}`));
}

export function updateGameById(gid: string, game: GameDtoModel) {
    return from(AxiosConfig.httpAxios().put(`/games/id?gid=${gid}`, {
        game
    }));
}

export function deleteGameById(gid: string) {
    return from(AxiosConfig.httpAxios().delete(`/games`, {
        data: {
            gid: gid,
        }
    }));
}
