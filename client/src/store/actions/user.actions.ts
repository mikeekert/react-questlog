import { GameDtoModel } from '../../models/gameDto.model';
import { UserModel } from '../../models/user.model';

export enum UserActionTypes {
    FetchingUserDataFromAuth0 = "[User] Fetching User data",
    FetchingUserDataFromAuth0Success = "[User] Fetched User data",
    FetchingUserGamesFromAPI = "[User] Fetching User Games From API",
    FetchingUserGamesFromAPISuccess = "[User] Fetched User Games From API",
    FetchingUserGamesFromAPIError = "[User] Error Fetching User Games From API",
}

export interface GetUserDataFromAuth0 {
    type: UserActionTypes.FetchingUserDataFromAuth0;
}

export interface GetUserDataFromAuth0Success {
    type: UserActionTypes.FetchingUserDataFromAuth0Success;
    payload: UserModel
}

export interface FetchingUserGamesFromAPI {
    type: UserActionTypes.FetchingUserGamesFromAPI;
    payload: string;
}

export interface FetchingUserGamesFromApiSuccess {
    type: UserActionTypes.FetchingUserGamesFromAPISuccess;
    payload: GameDtoModel[]
}

export interface FetchingUserGamesFromApiError {
    type: UserActionTypes.FetchingUserGamesFromAPIError;
}

export function fetchUserDataSuccess(user: UserModel): UserActions {
    return {
        type: UserActionTypes.FetchingUserDataFromAuth0Success,
        payload: user
    };
}

export function fetchUserGamesFromApi(uid: string): UserActions {
    return {
        type: UserActionTypes.FetchingUserGamesFromAPI,
        payload: uid
    };
}

export function fetchUserGamesFromApiSuccess(games: GameDtoModel[]): UserActions {
    return {
        type: UserActionTypes.FetchingUserGamesFromAPISuccess,
        payload: games
    };
}

export function fetchUserGamesFromApiError(): UserActions {
    return {
        type: UserActionTypes.FetchingUserGamesFromAPIError,
    };
}

export type UserActions =
    GetUserDataFromAuth0
    | GetUserDataFromAuth0Success
    | FetchingUserGamesFromAPI
    | FetchingUserGamesFromApiSuccess
    | FetchingUserGamesFromApiError;
