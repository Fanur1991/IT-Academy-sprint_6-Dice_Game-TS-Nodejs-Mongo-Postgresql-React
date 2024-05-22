import PlayerModel from '../../models/PlayerModel';
import { IRankingRepository } from '../../../core/repositories/IRankingRepository';
import { IRanking } from '../../../core/domain/entities/IRanking';
import { IGameDocument } from '../../models/GameModel';

class MongoRankingRepository implements IRankingRepository {
  async getRankings(): Promise<IRanking[]> {
    const players = await PlayerModel.find().populate<{
      games: IGameDocument[];
    }>('games');
    return players.map(player => ({
      player: {
        id: player.id,
        name: player.name,
        email: player.email,
        password: player.password,
        createdAt: player.createdAt,
      },
      successRate: this.calculateSuccessRate(player.games as IGameDocument[]),
    }));
  }

  async getWinner(): Promise<IRanking | null> {
    const rankings = await this.getRankings();
    return rankings.sort((a, b) => b.successRate - a.successRate)[0] || null;
  }

  async getLoser(): Promise<IRanking | null> {
    const rankings = await this.getRankings();
    return rankings.sort((a, b) => a.successRate - b.successRate)[0] || null;
  }

  private calculateSuccessRate(games: IGameDocument[]): number {
    const wins = games.filter(game => game.result).length;
    return games.length > 0 ? (wins / games.length) * 100 : 0;
  }
}

export default MongoRankingRepository;
