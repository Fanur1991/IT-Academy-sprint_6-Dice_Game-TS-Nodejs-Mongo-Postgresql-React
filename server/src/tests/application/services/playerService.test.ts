import PlayerService from '../../../application/services/playerService';
import { IPlayerRepository } from '../../../core/repositories/IPlayerRepository';
import { IGameRepository } from '../../../core/repositories/IGameRepository';

describe('PlayerService', () => {
  let service: PlayerService;
  let mockPlayerRepository: Partial<IPlayerRepository>;
  let mockGameRepository: Partial<IGameRepository>;

  beforeEach(() => {
    mockPlayerRepository = {
      createPlayer: jest.fn().mockImplementation(dto =>
        Promise.resolve({
          id: '1',
          name: dto.name || 'ANONYMOUS',
          email: dto.email,
          createdAt: new Date(),
          games: [],
        })
      ),
      updatePlayerName: jest.fn().mockImplementation(dto =>
        Promise.resolve({
          id: dto.id,
          name: dto.name,
          email: 'admin@admin.com',
          createdAt: new Date(),
          games: [],
        })
      ),
      listAllPlayers: jest.fn().mockResolvedValue([]),
    };

    mockGameRepository = {
      listGamesByPlayer: jest.fn().mockResolvedValue([]),
    };

    service = new PlayerService(
      mockPlayerRepository as IPlayerRepository,
      mockGameRepository as IGameRepository
    );
  });

  it('should create a player with name ANONYMOUS when no name is provided', async () => {
    const player = await service.createPlayer({
      name: '',
      email: 'admin@admin.com',
      password: '12345',
    });
    expect(player.name).toBe('ANONYMOUS');
    expect(mockPlayerRepository.createPlayer).toHaveBeenCalledWith({
      name: 'ANONYMOUS',
      email: 'admin@admin.com',
      password: '12345',
    });
  });

  it('should create a player with provided name', async () => {
    const player = await service.createPlayer({
      name: 'Fanur',
      email: 'admin@admin.com',
      password: '12345',
    });
    expect(player.name).toBe('Fanur');
  });

  it("should update a player's name and calculate the success rate correctly", async () => {
    mockPlayerRepository.updatePlayerName = jest.fn().mockImplementation(dto =>
      Promise.resolve({
        id: dto.id,
        name: dto.name,
        email: 'admin@admin.com',
        createdAt: new Date(),
        games: [{ result: true }, { result: false }, { result: true }],
      })
    );
    mockGameRepository.listGamesByPlayer = jest
      .fn()
      .mockResolvedValue([
        { result: true },
        { result: false },
        { result: true },
      ]);

    const dto = { id: '1', name: 'Updated Name' };
    const player = await service.updatePlayerName(dto);
    expect(player.name).toEqual('Updated Name');
    expect(player.successRate).toBeCloseTo(66.67, 1);
  });

  it('should list all players with calculated success rates', async () => {
    mockPlayerRepository.listAllPlayers = jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Player1',
        email: 'admin1@admin.com',
        createdAt: new Date(),
        games: [{ result: true }, { result: false }],
      },
      {
        id: '2',
        name: 'Player2',
        email: 'admin2@admin.com',
        createdAt: new Date(),
        games: [{ result: true }, { result: true }],
      },
    ]);
    mockGameRepository.listGamesByPlayer = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve([{ result: true }, { result: false }])
      )
      .mockImplementationOnce(() =>
        Promise.resolve([{ result: true }, { result: true }])
      );

    const players = await service.listAllPlayers();
    expect(players.length).toBe(2);
    expect(players[0].successRate).toBeCloseTo(50, 1);
    expect(players[1].successRate).toBeCloseTo(100, 1);
  });
});
