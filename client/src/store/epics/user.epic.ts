import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { getAllGamesForUser } from '../../services/games.service';
import { fetchUserGamesFromApiError, fetchUserGamesFromApiSuccess, UserActionTypes } from '../actions/user.actions';

export const userEpic = (action$: any) =>
    action$.pipe(
        ofType(UserActionTypes.FetchingUserGamesFromAPI),
        mergeMap((action: any) => {
                return getAllGamesForUser(action.payload).pipe(
                    map((res: any) => {
                        return fetchUserGamesFromApiSuccess(res.data);
                    }),
                    catchError(() => {
                        return of(fetchUserGamesFromApiError());
                    })
                );
            }
        )
    );
