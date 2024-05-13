// Сервис будет зависеть от репозитория Player для получения всех игроков и их игр.
import { IRankingRepository } from "../interfaces/IRankingRepository";

class RankingService {
  private playerRepository: IRankingRepository;

  constructor(playerRepository: IRankingRepository) {
    this.playerRepository = playerRepository;
  }

  async getRankings() {
    return await this.playerRepository.getRankings();
  }

  async getLoser() {
    return await this.playerRepository.getLoser();
  }

  async getWinner() {
    return await this.playerRepository.getWinner();
  }
}

export default RankingService;
