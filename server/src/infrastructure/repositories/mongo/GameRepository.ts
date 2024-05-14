import Game from '../../models/GameModel';
import { IGameRepository } from '../../../core/repositories/IGameRepository';
import { IGame } from '../../../core/domain/entities/IGame';

class GameRepository implements IGameRepository {
  async createGame(
    playerId: string,
    diceOne: number,
    diceTwo: number
  ): Promise<IGame> {
    const result = diceOne + diceTwo === 7;
    const game = new Game({ playerId, diceOne, diceTwo, result, createdAt });
    await game.save();
    return game;
  }

  async listGamesByPlayer(playerId: string): Promise<IGame[]> {
    return Game.find({ playerId });
  }

  async deleteGamesByPlayer(playerId: string): Promise<any> {
    return Game.deleteMany({ playerId });
  }
}

export default GameRepository;
