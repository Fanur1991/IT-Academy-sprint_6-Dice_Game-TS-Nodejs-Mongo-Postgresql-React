import RankingService from '../../../application/services/rankingService';
import { IRankingRepository } from '../../../core/repositories/IRankingRepository';

describe('RankingService', () => {
  let service: RankingService;
  let mockRankingRepository: Partial<IRankingRepository>;

  beforeEach(() => {
    mockRankingRepository = {
      getRankings: jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'Fanur',
          email: 'admin@admin.com',
          password: '123',
          successRate: 90,
        },
        {
          id: '2',
          name: 'Jose',
          email: 'admin2@admin.com',
          password: '456',
          successRate: 70,
        },
        {
          id: '3',
          name: 'Pedro',
          email: 'admin3@admin.com',
          password: '789',
          successRate: 50,
        },
      ]),
    };

    service = new RankingService(mockRankingRepository as IRankingRepository);
  });

  it('should return sorted players and average success rate', async () => {
    const rankings = await service.getRankings();
    expect(rankings.players[0].name).toBe('Fanur');
    expect(rankings.players[2].name).toBe('Pedro');
    expect(rankings.averageSuccessRate).toBeCloseTo(70, 1);
    expect(mockRankingRepository.getRankings).toHaveBeenCalled();
  });

  it('should return the player with the lowest success rate', async () => {
    const loser = await service.getLoser();
    expect(loser).not.toBeNull();
    if (loser) {
      expect(loser.name).toBe('Pedro');
      expect(loser.successRate).toBe(50);
    }
  });

  it('should return the player with the highest success rate', async () => {
    const winner = await service.getWinner();
    expect(winner).not.toBeNull();
    if (winner) {
      expect(winner.name).toBe('Fanur');
      expect(winner.successRate).toBe(90);
    }
  });
});
