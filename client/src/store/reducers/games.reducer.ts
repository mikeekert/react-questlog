import { IGames } from '../../models/games.model';
import { GamesActions, GamesDataActionTypes } from "../actions/games.actions";

export interface IGameState {
  games: IGames[],
  loading: boolean
}

export const initialState: any = {
  games: [],
  loading: false
};

export function gamesReducer(state: IGameState = initialState, action: GamesActions): any {
  switch (action.type) {
    case GamesDataActionTypes.ClearGames:
      return {
        ...state,
        games: []
      }
    case GamesDataActionTypes.FetchGamesFromIGDBByNameError:
      return {
        ...state,
        loading: false
      }
    case GamesDataActionTypes.FetchGamesFromIGDBByName:
      return {
        ...state,
        loading: true
      }
    case GamesDataActionTypes.FetchGamesFromIGDBByNameSuccess:
      return {
        games: action.payload,
        loading: false
      };
  }
  return state;
}
