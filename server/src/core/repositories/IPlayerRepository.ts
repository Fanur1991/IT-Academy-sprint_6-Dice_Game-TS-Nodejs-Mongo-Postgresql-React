import { IPlayer } from '../domain/entities/IPlayer';
import { CreatePlayerDTO } from '../../application/dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../../application/dto/updatePlayer.dto';

export interface IPlayerRepository {
  createPlayer(data: CreatePlayerDTO): Promise<IPlayer>;
  // findPlayerById(id: string): Promise<IPlayer>;
  updatePlayerName(data: UpdatePlayerDTO): Promise<IPlayer>;
  listAllPlayers(): Promise<IPlayer[]>;
  // deleteAllGamesForPlayer(playerId: string): Promise<{ message: string }>;
  // findPlayerByEmail(email: string): Promise<IPlayer | null>;
}
