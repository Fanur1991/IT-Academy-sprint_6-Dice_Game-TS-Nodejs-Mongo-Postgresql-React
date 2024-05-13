export interface IGameRepository {
  createGame(playerId: string, diceOne: number, diceTwo: number): Promise<any>;
  listGamesByPlayer(playerId: string): Promise<any[]>;
  deleteGamesByPlayer(playerId: string): Promise<any>;
}
