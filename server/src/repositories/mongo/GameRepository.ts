import Game from '../../models/GameModel';
import { IGameRepository } from '../../interfaces/IGameRepository';

class GameRepository implements IGameRepository {
  async createGame(playerId: string, diceOne: number, diceTwo: number): Promise<any> {
      const result = diceOne + diceTwo === 7;
      const game = new Game({ playerId, diceOne, diceTwo, result });
      await game.save();
      return game;
  }

  async listGamesByPlayer(playerId: string): Promise<any[]> {
      return Game.find({ playerId });
  }

  async deleteGamesByPlayer(playerId: string): Promise<any> {
      return Game.deleteMany({ playerId });
  }
}

export default GameRepository;