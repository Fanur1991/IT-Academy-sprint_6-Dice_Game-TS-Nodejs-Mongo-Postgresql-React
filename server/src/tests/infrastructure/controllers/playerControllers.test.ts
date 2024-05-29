import request from 'supertest';
import app from '../../../infrastructure/app';

interface Player {
  id: string;
  name: string;
  successRate: number;
}

jest.mock('../../../application/services/authService', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
    comparePasswords: jest.fn(inputPassword =>
      Promise.resolve(inputPassword === '123')
    ),
    generateToken: jest.fn().mockReturnValue('fakeToken123'),
    verifyToken: jest.fn().mockReturnValue({ id: 'mockedId' }),
  })),
}));

jest.mock('../../../application/services/playerService', () => {
  const mockPlayerData = {
    id: '1',
    name: 'Fanur',
    email: 'admin@admin.com',
    createdAt: new Date().toISOString(),
    games: [],
    successRate: 100,
  };

  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      createPlayer: jest.fn().mockResolvedValue(mockPlayerData),
      findPlayerByEmail: jest.fn().mockResolvedValue(mockPlayerData),
      updatePlayerName: jest.fn().mockResolvedValue({
        ...mockPlayerData,
        name: 'Updated Name',
      }),
      listAllPlayers: jest
        .fn()
        .mockResolvedValue([
          mockPlayerData,
          { ...mockPlayerData, id: '2', name: 'Jose' },
          { ...mockPlayerData, id: '3', name: 'Pedro' },
        ]),
    })),
  };
});

describe('PlayerController', () => {
  describe('POST /api/players', () => {
    it('should create a player and return 201 status code with player data', async () => {
      const playerData = {
        name: 'Fanur',
        email: 'admin@admin.com',
        password: '123',
      };
      const token = 'fakeToken123';

      const response = await request(app).post('/api/players').send(playerData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: 'Fanur',
        email: 'admin@admin.com',
        token: token,
      });
    });
  });

  describe('PUT /players/:id', () => {
    it('should update the player name and return 200 status code with updated data', async () => {
      const updatedData = { name: 'Updated Name' };
      const token = 'fakeToken123';

      const response = await request(app)
        .put('/api/players/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.name).toEqual('Updated Name');
    });
  });

  describe('GET /players', () => {
    it('should return a list of all players with their success rates', async () => {
      const token = 'fakeToken123';
      const response = await request(app)
        .get('/api/players')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((player: Player) => {
        expect(player).toHaveProperty('id');
        expect(player).toHaveProperty('name');
        expect(player).toHaveProperty('successRate');
      });
    });
  });

  describe('POST /api/players/login', () => {
    it('should authenticate a player and return a token', async () => {
      const loginCredentials = {
        email: 'admin@admin.com',
        password: '123',
      };
      const token = 'fakeToken123';

      const response = await request(app)
        .post('/api/players/login')
        .send(loginCredentials);

      expect(response.status).toBe(200);
      expect(response.body.token).toEqual(token);
    });

    it('should return 401 for invalid credentials', async () => {
      const loginCredentials = {
        email: 'admin@admin.com',
        password: 'wrongpassword',
      };

      const response = await request(app)
        .post('/api/players/login')
        .send(loginCredentials);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Invalid credentials');
    });
  });
});
