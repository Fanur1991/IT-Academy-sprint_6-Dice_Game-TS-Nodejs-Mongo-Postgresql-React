import { IPlayerRepository } from '../interfaces/IPlayerRepository';

class PlayerService {
  private playerRepository: IPlayerRepository;

  constructor(playerRepository: IPlayerRepository) {
    this.playerRepository = playerRepository;
  }

  async createPlayer(data: any) {
    return await this.playerRepository.createPlayer(data);
  }

  // async findPlayerById(id: string) {
  //   return await this.playerRepository.findPlayerById(id);
  // }

  async updatePlayerName(id: string, name: string) {
    return await this.playerRepository.updatePlayerName(id, name);
  }

  async listAllPlayers() {
    return await this.playerRepository.listAllPlayers();
  }

  // async deleteAllGamesForPlayer(playerId: string) {
  //   return await this.playerRepository.deleteAllGamesForPlayer(playerId);
  // }
}

export default PlayerService;
