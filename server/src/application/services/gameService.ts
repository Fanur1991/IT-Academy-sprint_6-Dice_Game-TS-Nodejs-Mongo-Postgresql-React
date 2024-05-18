import { IGameRepository } from '../../core/repositories/IGameRepository';
import { CreateGameDTO } from '../dto/createGame.dto';
import { GameDTO } from '../dto/game.dto';

class GameService {
  private gameRepository: IGameRepository;

  constructor(gameRepository: IGameRepository) {
    this.gameRepository = gameRepository;
  }

  async createGame(data: CreateGameDTO): Promise<GameDTO> {
    const result = data.diceOne + data.diceTwo === 7;
    const game = await this.gameRepository.createGame({
      ...data,
      result,
    });
    return {
      id: game.id,
      playerId: game.playerId,
      diceOne: game.diceOne,
      diceTwo: game.diceTwo,
      result: game.result,
      createdAt: game.createdAt,
    };
  }

  async listGamesByPlayer(playerId: string): Promise<GameDTO[]> {
    const games = await this.gameRepository.listGamesByPlayer(playerId);
    return games.map(game => ({
      id: game.id,
      playerId: game.playerId,
      diceOne: game.diceOne,
      diceTwo: game.diceTwo,
      result: game.result,
      createdAt: game.createdAt,
    }));
  }

  async deleteGamesByPlayer(playerId: string): Promise<{ message: string }> {
    return await this.gameRepository.deleteGamesByPlayer(playerId);
  }
}

export default GameService;
