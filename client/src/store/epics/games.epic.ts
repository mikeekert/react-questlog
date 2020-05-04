import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { getGameByName } from "../../services/igdb.service";
import { fetchGamesByNameError, fetchGamesByNameSuccess, GamesDataActionTypes, } from "../actions/games.actions";

export const fetchNewGamesEpic = (action$: any) =>
    action$.pipe(
        ofType(GamesDataActionTypes.FetchGamesFromIGDBByName),
        mergeMap((action: any) =>
            getGameByName(action.payload).pipe(
                map((res: any) => {
                    return fetchGamesByNameSuccess(res.data);
                }),
                catchError(() => {
                    return of(fetchGamesByNameError());
                })
      )
    )
  );
