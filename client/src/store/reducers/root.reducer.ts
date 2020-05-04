import { combineReducers } from "redux";
import { gamesReducer, IGameState } from "./games.reducer";
import { IUserState, userReducer } from './user.reducer';

export default combineReducers({
  gamesReducer: gamesReducer,
  userReducer: userReducer
});

export interface IAppState {
  userReducer: IUserState,
  gamesReducer: IGameState
}
