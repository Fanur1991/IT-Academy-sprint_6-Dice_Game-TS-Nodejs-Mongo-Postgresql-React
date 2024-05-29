import GameService from '../../../application/services/gameService';
import { IGameRepository } from '../../../core/repositories/IGameRepository';

describe('GameService', () => {
  let service: GameService;
  let mockGameRepository: Partial<IGameRepository>;

  beforeEach(() => {
    mockGameRepository = {
      createGame: jest.fn().mockImplementation(data =>
        Promise.resolve({
          id: '1',
          playerId: data.playerId,
          diceOne: data.diceOne,
          diceTwo: data.diceTwo,
          result: data.diceOne + data.diceTwo === 7,
          createdAt: new Date(),
        })
      ),
      listGamesByPlayer: jest.fn().mockImplementation(playerId =>
        Promise.resolve([
          { id: '1', playerId, diceOne: 3, diceTwo: 4, result: true, createdAt: new Date() },
          { id: '2', playerId, diceOne: 6, diceTwo: 1, result: false, createdAt: new Date() }
        ])
      ),
      deleteGamesByPlayer: jest.fn().mockImplementation(playerId =>
        Promise.resolve({ message: `All games deleted for player ${playerId}` })
      ),
    };

    service = new GameService(mockGameRepository as IGameRepository);
  });

  it('should create a game and calculate result correctly', async () => {
    const gameData = { playerId: '1', diceOne: 4, diceTwo: 3 };
    const game = await service.createGame(gameData);
    expect(game.result).toBe(true);
    expect(game.playerId).toBe('1');
    expect(mockGameRepository.createGame).toHaveBeenCalledWith({
      ...gameData,
      result: true,
    });
  });

  it('should list all games for a player', async () => {
    const games = await service.listGamesByPlayer('1');
    expect(games.length).toBe(2);
    expect(games[0].result).toBe(true);
    expect(games[1].result).toBe(false);
  });

  it('should delete all games for a player and return a success message', async () => {
    const response = await service.deleteGamesByPlayer('1');
    expect(response.message).toBe('All games deleted for player 1');
  });
});
