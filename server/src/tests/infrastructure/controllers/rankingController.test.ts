import request from 'supertest';
import app from '../../../infrastructure/app';

jest.mock('../../../application/services/rankingService', () => {
  const mockRankingData = [
    { id: '1', name: 'Fanur', successRate: 90 },
    { id: '2', name: 'Jose', successRate: 70 },
    { id: '3', name: 'Pedro', successRate: 50 },
  ];

  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      getRankings: jest.fn().mockImplementation(() => {
        const sortedPlayers = mockRankingData.sort(
          (a, b) => b.successRate - a.successRate
        );
        const averageSuccessRate =
          mockRankingData.reduce((sum, player) => sum + player.successRate, 0) /
          mockRankingData.length;
        return Promise.resolve({
          players: sortedPlayers,
          averageSuccessRate: +averageSuccessRate.toFixed(2),
        });
      }),
      getLoser: jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockRankingData.sort((a, b) => a.successRate - b.successRate)[0]
        );
      }),
      getWinner: jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockRankingData.sort((a, b) => b.successRate - a.successRate)[0]
        );
      }),
    })),
  };
});

jest.mock('../../../application/services/authService', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    comparePasswords: jest.fn(inputPassword =>
      Promise.resolve(inputPassword === '123')
    ),
    verifyToken: jest.fn().mockReturnValue({ id: 'mockedId' }),
  })),
}));

describe('RankingController', () => {
  describe('GET /api/rankings', () => {
    it('should return the ranking of players sorted by success rate and the average success rate of all players', async () => {
      const response = await request(app)
        .get('/api/ranking')
        .set('Authorization', 'Bearer fakeToken123');

      expect(response.status).toBe(200);
      expect(response.body.players.length).toBe(3);
      expect(response.body.players[0].name).toBe('Fanur');
      expect(response.body.averageSuccessRate).toBeDefined();
    });
  });

  describe('GET /api/ranking/loser', () => {
    it('should return the player with the worst success rate', async () => {
      const response = await request(app)
        .get('/api/ranking/loser')
        .set('Authorization', 'Bearer fakeToken123');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Pedro');
      expect(response.body.successRate).toBe(50);
    });
  });

  describe('GET /api/rankings/winner', () => {
    it('should return the player with the best success rate', async () => {
      const response = await request(app)
        .get('/api/ranking/winner')
        .set('Authorization', 'Bearer fakeToken123');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Fanur');
      expect(response.body.successRate).toBe(90);
    });
  });
});
