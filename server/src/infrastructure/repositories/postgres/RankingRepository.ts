import { IRankingRepository } from '../../../core/repositories/IRankingRepository';
import { prisma } from '../../config/prismaConfig';
import { IRanking } from '../../../core/domain/entities/IRanking';
import { IGameDocument } from '../../models/GameModel';

class PostgresRankingRepository implements IRankingRepository {
  async getRankings(): Promise<IRanking[]> {
    const players = (await prisma.player.findMany({
      include: {
        games: true,
      },
    })) as any[];
    return players.map(player => ({
      id: player.id,
      name: player.name,
      email: player.email,
      password: player.password,
      createdAt: player.createdAt,
      successRate: this.calculateSuccessRate(player.games as IGameDocument[]),
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

  private calculateSuccessRate(games: IGameDocument[]): number {
    const wins = games.filter(game => game.result).length;
    return games.length > 0 ? (wins / games.length) * 100 : 0;
  }
}

export default PostgresRankingRepository;
