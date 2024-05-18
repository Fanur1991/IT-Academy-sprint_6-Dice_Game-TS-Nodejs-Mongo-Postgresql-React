import { IGame } from '../domain/entities/IGame';
import { CreateGameDTO } from '../../application/dto/createGame.dto';

export interface IGameRepository {
  createGame(data: CreateGameDTO & { result: boolean }): Promise<IGame>;
  listGamesByPlayer(playerId: string): Promise<IGame[]>;
  deleteGamesByPlayer(playerId: string): Promise<{ message: string }>;
}
