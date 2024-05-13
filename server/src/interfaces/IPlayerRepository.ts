export interface IPlayerRepository {
  createPlayer(data: any): Promise<any>;
  // findPlayerById(id: string): Promise<any>;
  updatePlayerName(id: string, name: string): Promise<any>;
  listAllPlayers(): Promise<any[]>;
  // deleteAllGamesForPlayer(playerId: string): Promise<any>;
}
