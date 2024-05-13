import { IRankingRepository } from '../../interfaces/IRankingRepository';
import Player from '../../models/PlayerModel';

class MongoRankingRepository implements IRankingRepository {
  async getRankings(): Promise<any[]> {
    return Player.aggregate([
      {
        $project: {
          username: 1,
          successRate: { $divide: ['$gamesWon', '$gamesPlayed'] },
        },
      },
      {
        $sort: { successRate: -1 },
      },
      {
        $group: {
          _id: null,
          players: { $push: '$$ROOT' },
          averageSuccessRate: { $avg: '$successRate' },
        },
      },
      {
        $project: {
          _id: 0,
          players: 1,
          averageSuccessRate: 1,
        },
      },
    ]).exec();
  }

  async getLoser(): Promise<any> {
    return Player.findOne().sort({ successRate: 1 }).limit(1);
  }

  async getWinner(): Promise<any> {
    return Player.findOne().sort({ successRate: -1 }).limit(1);
  }
}

export default MongoRankingRepository;
