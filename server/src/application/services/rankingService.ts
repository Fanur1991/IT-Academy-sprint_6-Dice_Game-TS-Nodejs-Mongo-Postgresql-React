// Сервис будет зависеть от репозитория Player для получения всех игроков и их игр.
import { IRankingRepository } from '../../core/repositories/IRankingRepository';
import { RankingDTO } from '../../application/dto/ranking.dto';

class RankingService {
  private rankingRepository: IRankingRepository;

  constructor(rankingRepository: IRankingRepository) {
    this.rankingRepository = rankingRepository;
  }

  async getRankings(): Promise<RankingDTO[]> {
    const players = await this.rankingRepository.getRankings();
    return players
      .map(player => ({
        player: {
          ...player.player,
          email: player.player.email,
          password: player.player.password,
          successRate: player.successRate,
        },
      }))
      .sort((a, b) => b.player.successRate - a.player.successRate);
  }

  async getLoser(): Promise<RankingDTO | null> {
    const players = await this.rankingRepository.getRankings();
    if (!players || players.length === 0) return null;
    return players.sort((a, b) => a.successRate - b.successRate)[0] || null;
  }

  async getWinner(): Promise<RankingDTO | null> {
    const players = await this.rankingRepository.getRankings();
    if (!players || players.length === 0) return null;
    return players.sort((a, b) => b.successRate - a.successRate)[0] || null;
  }

  async getAverageSuccessRate(): Promise<number> {
    const players = await this.rankingRepository.getRankings();
    const totalSuccessRate = players.reduce(
      (sum, player) => sum + player.successRate,
      0
    );
    return players.length ? totalSuccessRate / players.length : 0;
  }
}

export default RankingService;
