import Game from '../../models/GameModel';
import { IGameRepository } from '../../../core/repositories/IGameRepository';
import { IGame } from '../../../core/domain/entities/IGame';
import { CreateGameDTO } from '../../../application/dto/createGame.dto';

class GameRepository implements IGameRepository {
  async createGame(data: CreateGameDTO & { result: boolean }): Promise<IGame> {
    const game = new Game({
      ...data,
      createdAt: new Date(),
    });
    await game.save();
    return game.toObject() as IGame;
  }

  async listGamesByPlayer(playerId: string): Promise<IGame[]> {
    const games = await Game.find({ playerId });
    return games.map(game => game.toObject() as IGame);
  }

  async deleteGamesByPlayer(playerId: string): Promise<{ message: string }> {
    await Game.deleteMany({ playerId });
    return { message: 'Games deleted successfully' };
  }
}

export default GameRepository;
