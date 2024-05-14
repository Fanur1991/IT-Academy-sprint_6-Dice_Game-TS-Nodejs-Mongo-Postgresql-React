import { IPlayer } from "../domain/entities/IPlayer";

export interface IPlayerRepository {
  createPlayer(name: string): Promise<IPlayer>;
  findPlayerById(id: string): Promise<IPlayer>;
  updatePlayerName(id: string, name: string): Promise<IPlayer>;
  listAllPlayers(): Promise<IPlayer[]>;
  deleteAllGamesForPlayer(playerId: string): Promise<any>;
}
