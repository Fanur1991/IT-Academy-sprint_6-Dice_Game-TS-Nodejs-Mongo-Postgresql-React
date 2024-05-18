import { IRankingRepository } from '../../../core/repositories/IRankingRepository';
import { prisma } from '../../config/prismaConfig';
import { IRanking } from '../../../core/domain/entities/IRanking';
import { IGame } from '../../../core/domain/entities/IGame';
import { IPlayer } from '../../../core/domain/entities/IPlayer';

class PostgresRankingRepository implements IRankingRepository {
  async getRankings(): Promise<IRanking[]> {
    const players = (await prisma.player.findMany({
      include: {
        games: true,
      },
    })) as IPlayer[];
    return players.map(player => {
      const successRate = player.games?.length
        ? player.games.filter((game: IGame) => game.result).length /
          player.games.length
        : 0;
      return {
        player: {
          id: player.id,
          name: player.name,
          createdAt: player.createdAt,
        },
        successRate,
      };
    });
  }

  async getLoser(): Promise<IRanking | null> {
    const players = await this.getRankings();
    if (players.length === 0) return null;
    return players.reduce(
      (min, player) => (player.successRate < min.successRate ? player : min),
      players[0]
    );
  }

  async getWinner(): Promise<IRanking | null> {
    const players = await this.getRankings();
    if (players.length === 0) return null;
    return players.reduce(
      (max, player) => (player.successRate > max.successRate ? player : max),
      players[0]
    );
  }
}

export default PostgresRankingRepository;
