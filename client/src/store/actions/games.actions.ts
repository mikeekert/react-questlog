import { IGames } from "../../models/games.model";

export enum GamesDataActionTypes {
    FetchGamesFromIGDBByName = "[AddGameForm] Fetching API data by game name",
    FetchGamesFromIGDBByNameSuccess = "[AddGameForm] Fetched API data by game name",
    FetchGamesFromIGDBByNameError = "[AddGameForm] Error at API",
    ClearGames = "[AddGameForm] Clearing list of games",
}

export interface ClearGames {
    type: GamesDataActionTypes.ClearGames;
}

export interface FetchGamesFromIGDBByName {
    type: GamesDataActionTypes.FetchGamesFromIGDBByName;
    payload: string;
}

export interface FetchGamesFromIGDBByNameError {
    type: GamesDataActionTypes.FetchGamesFromIGDBByNameError;
}

export interface FetchGamesFromIGDBByNameSuccess {
    type: GamesDataActionTypes.FetchGamesFromIGDBByNameSuccess;
    payload: IGames[];
}

export function clearGames(): GamesActions {
    return {
        type: GamesDataActionTypes.ClearGames
    }
}

export function fetchGamesByName(name: string): GamesActions {
    return {
        type: GamesDataActionTypes.FetchGamesFromIGDBByName,
        payload: name,
    };
}

export function fetchGamesByNameSuccess(games: IGames[]): GamesActions {
    return {
        type: GamesDataActionTypes.FetchGamesFromIGDBByNameSuccess,
        payload: games,
    };
}

export function fetchGamesByNameError(): GamesActions {
    return {
        type: GamesDataActionTypes.FetchGamesFromIGDBByNameError,
    };
}

export type GamesActions =
    ClearGames
    | FetchGamesFromIGDBByName
    | FetchGamesFromIGDBByNameSuccess
    | FetchGamesFromIGDBByNameError;
