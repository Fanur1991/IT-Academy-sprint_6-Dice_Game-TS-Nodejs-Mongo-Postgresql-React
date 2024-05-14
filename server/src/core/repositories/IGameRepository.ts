import { IGame } from '../domain/entities/IGame';

export interface IGameRepository {
  createGame(
    playerId: string,
    diceOne: number,
    diceTwo: number
  ): Promise<IGame>;
  listGamesByPlayer(playerId: string): Promise<IGame[]>;
  deleteGamesByPlayer(playerId: string): Promise<any>;
}
