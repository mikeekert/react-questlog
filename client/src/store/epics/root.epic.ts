import { combineEpics } from "redux-observable";
import { fetchNewGamesEpic } from "./games.epic";
import { userEpic } from './user.epic';

export const rootEpic = combineEpics(fetchNewGamesEpic, userEpic);
