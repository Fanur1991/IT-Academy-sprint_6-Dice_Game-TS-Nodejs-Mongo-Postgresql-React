import { PlayerModel } from '../../models/PlayerModel';
import { IRankingRepository } from '../../../core/repositories/IRankingRepository';
import { IRanking } from '../../../core/domain/entities/IRanking';
import { IGameDocument } from '../../models/GameModel';

class MongoRankingRepository implements IRankingRepository {
  async getRankings(): Promise<IRanking[]> {
    const players = await PlayerModel.find()
      .populate<{ games: IGameDocument[] }>('games')
      .exec();
    return players.map(player => {
      const games = player.games;
      const successRate = games.length
        ? games.filter(game => game.result).length / games.length
        : 0;
      return {
        player: player.toObject(),
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

export default MongoRankingRepository;
