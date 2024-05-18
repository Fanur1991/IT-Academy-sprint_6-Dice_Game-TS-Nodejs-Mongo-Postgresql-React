// Сервис будет зависеть от репозитория Player для получения всех игроков и их игр.
import { IRankingRepository } from '../../core/repositories/IRankingRepository';
import { RankingDTO } from '../../application/dto/ranking.dto';

class RankingService {
  private rankingRepository: IRankingRepository;
  private cache: RankingDTO[] | null = null;

  constructor(rankingRepository: IRankingRepository) {
    this.rankingRepository = rankingRepository;
  }

  private async fetchRankings(): Promise<RankingDTO[]> {
    if (!this.cache) {
      const rankings = await this.rankingRepository.getRankings();
      this.cache = rankings.map(ranking => ({
        player: {
          id: ranking.player.id,
          name: ranking.player.name,
          createdAt: ranking.player.createdAt,
          successRate: ranking.successRate,
        },
      }));
    }
    return this.cache;
  }

  async getRankings(): Promise<RankingDTO[]> {
    return this.fetchRankings();
  }

  async getLoser(): Promise<RankingDTO | null> {
    const rankings = await this.fetchRankings();
    return (
      rankings.reduce(
        (prev, current) =>
          prev.player.successRate < current.player.successRate ? prev : current,
        rankings[0]
      ) || null
    );
  }

  async getWinner(): Promise<RankingDTO | null> {
    const rankings = await this.fetchRankings();
    return (
      rankings.reduce(
        (prev, current) =>
          prev.player.successRate > current.player.successRate ? prev : current,
        rankings[0]
      ) || null
    );
  }

  async getAverageSuccessRate(): Promise<number> {
    const rankings = await this.fetchRankings();
    const totalSuccessRate = rankings.reduce(
      (sum, ranking) => sum + ranking.player.successRate,
      0
    );
    return rankings.length ? totalSuccessRate / rankings.length : 0;
  }

  invalidateCache() {
    this.cache = null;
  }
}

export default RankingService;
