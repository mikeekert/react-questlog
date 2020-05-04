import { UserModel } from '../../models/user.model';
import { UserActions, UserActionTypes } from "../actions/user.actions";

export interface IUserState {
    user: UserModel,
    loading: boolean
}

export const initialUserState = {
    user: {
        games: []
    },
    loading: false
};

export function userReducer(state = initialUserState, action: UserActions): any {
    switch (action.type) {
        case UserActionTypes.FetchingUserDataFromAuth0:
            return {
                ...state,
            };

        case UserActionTypes.FetchingUserDataFromAuth0Success:
            return {
                ...state,
                user: action.payload
            }

        case UserActionTypes.FetchingUserGamesFromAPI:
            return {
                ...state,
                loading: true
            };

        case UserActionTypes.FetchingUserGamesFromAPISuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    games: action.payload
                },
                loading: false
            }
    }
    return state;
}
