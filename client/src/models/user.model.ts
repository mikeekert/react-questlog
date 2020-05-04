import { GameDtoModel } from './gameDto.model';

export interface UserModel {
    name: string;
    sub: string;
    games: GameDtoModel[]
}
