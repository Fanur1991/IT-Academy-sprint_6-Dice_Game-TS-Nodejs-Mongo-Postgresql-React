import Game from '../../models/GameModel';
import Player from '../../models/PlayerModel';
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

    await Player.findByIdAndUpdate(data.playerId, {
      $push: { games: game._id },
    });
    return game.toObject() as IGame;
  }

  async listGamesByPlayer(playerId: string): Promise<IGame[]> {
    const games = await Game.find({ playerId });
    return games.map(game => game.toObject({ getters: true }) as IGame);
  }

  async deleteGamesByPlayer(playerId: string): Promise<{ message: string }> {
    await Game.deleteMany({ playerId });
    return { message: 'Games deleted successfully' };
  }
}

export default GameRepository;
