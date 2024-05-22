import { IRankingRepository } from '../../../core/repositories/IRankingRepository';
import { prisma } from '../../config/prismaConfig';
import { IRanking } from '../../../core/domain/entities/IRanking';

class PostgresRankingRepository implements IRankingRepository {
  async getRankings(): Promise<IRanking[]> {
    const players = await prisma.player.findMany({
      include: {
        games: true,
      },
    });
    return players.map(player => ({
      player: {
        id: player.id,
        name: player.name,
        email: player.email,
        password: player.password,
        createdAt: player.createdAt,
      },
      successRate: player.games.length
        ? (player.games.filter(game => game.result).length /
            player.games.length) *
          100
        : 0,
    }));
  }

  async getLoser(): Promise<IRanking | null> {
    const players = await this.getRankings();
    return players.length
      ? players.reduce((min, player) =>
          player.successRate < min.successRate ? player : min
        )
      : null;
  }

  async getWinner(): Promise<IRanking | null> {
    const players = await this.getRankings();
    return players.length
      ? players.reduce((max, player) =>
          player.successRate > max.successRate ? player : max
        )
      : null;
  }
}

export default PostgresRankingRepository;
