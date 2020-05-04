import { from } from "rxjs";
import AxiosConfig from '../utils/axios';

export function getGameByName(name: string) {
    return from(AxiosConfig.httpAxios().get<[]>(`/games?n=${name}`));
}

export function getHltbByName(name: string) {
    return from(AxiosConfig.httpAxios().get<[]>(`/games/hltb/?n=${name}`).then(res => {
        return res.data.find(res => res);
    }))
}
