import request from 'supertest';
import app from '../../../infrastructure/app';

interface Game {
  id: string;
  playerId: string;
  diceOne: number;
  diceTwo: number;
  result: boolean;
  createdAt: Date;
}

jest.mock('../../../application/services/gameService', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      createGame: jest.fn().mockImplementation(data => {
        return Promise.resolve({
          id: 'gameId',
          playerId: data.playerId,
          diceOne: data.diceOne,
          diceTwo: data.diceTwo,
          result: data.diceOne + data.diceTwo === 7,
          createdAt: new Date(),
        });
      }),
      listGamesByPlayer: jest.fn().mockImplementation(playerId => {
        return Promise.resolve([
          {
            id: '1',
            playerId,
            diceOne: 4,
            diceTwo: 3,
            result: true,
            createdAt: new Date(),
          },
          {
            id: '2',
            playerId,
            diceOne: 1,
            diceTwo: 1,
            result: false,
            createdAt: new Date(),
          },
        ]);
      }),
      deleteGamesByPlayer: jest.fn().mockImplementation(playerId => {
        return Promise.resolve({
          message: `Games for player ${playerId} deleted successfully.`,
        });
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

describe('GameController', () => {
  describe('POST /api/games/:id', () => {
    it('should create a game and return 201 status with game data', async () => {
      const response = await request(app)
        .post('/api/games/1')
        .set('Authorization', 'Bearer fakeToken123')
        .send({ diceOne: 4, diceTwo: 3 });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('result');
      expect(response.body).toHaveProperty('playerId');
      expect(response.body).toHaveProperty('diceOne');
      expect(response.body).toHaveProperty('diceTwo');
      expect(response.body).toHaveProperty('createdAt');
    });
  });

  describe('GET /api/games/:id', () => {
    it('should return a list of games by player', async () => {
      const response = await request(app)
        .get('/api/games/1')
        .set('Authorization', 'Bearer fakeToken123');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      response.body.forEach((game: Game) => {
        expect(game).toHaveProperty('id');
        expect(game).toHaveProperty('result');
      });
    });
  });

  describe('DELETE /api/games/:id', () => {
    it('should delete games by player and return success message', async () => {
      const response = await request(app)
        .delete('/api/games/1')
        .set('Authorization', 'Bearer fakeToken123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Games for player 1 deleted successfully.',
      });
    });
  });
});
