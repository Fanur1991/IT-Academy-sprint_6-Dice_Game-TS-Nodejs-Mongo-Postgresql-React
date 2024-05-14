import { IGameRepository } from '../../core/repositories/IGameRepository';

class GameService {
  private gameRepository: IGameRepository;

  constructor(gameRepository: IGameRepository) {
    this.gameRepository = gameRepository;
  }

  async createGame(playerId: string, diceOne: number, diceTwo: number) {
    return await this.gameRepository.createGame(playerId, diceOne, diceTwo);
  }

  async listGamesByPlayer(playerId: string) {
    return await this.gameRepository.listGamesByPlayer(playerId);
  }

  async deleteGamesByPlayer(playerId: string) {
    return await this.gameRepository.deleteGamesByPlayer(playerId);
  }
}

export default GameService;
