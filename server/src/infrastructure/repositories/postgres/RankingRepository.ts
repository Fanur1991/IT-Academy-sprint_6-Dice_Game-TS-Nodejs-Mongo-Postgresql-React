import { IRankingRepository } from '../../../core/repositories/IRankingRepository';
import { prisma } from '../../config/prismaConfig';

class PostgresRankingRepository implements IRankingRepository {
  async getRankings(): Promise<any[]> {
    return prisma.$queryRaw`
        SELECT
            p.*,
            (p.games_won::decimal / NULLIF(p.games_played, 0)) as success_rate,
            AVG((p.games_won::decimal / NULLIF(p.games_played, 0))) OVER () as average_success_rate
        FROM
            players p
        ORDER BY
            success_rate DESC;
    `;
  }

  async getLoser(): Promise<any> {
    return prisma.player.findFirst({
      orderBy: {
        successRate: 'asc',
      },
    });
  }

  async getWinner(): Promise<any> {
    return prisma.player.findFirst({
      orderBy: {
        successRate: 'desc',
      },
    });
  }
}

export default PostgresRankingRepository;
