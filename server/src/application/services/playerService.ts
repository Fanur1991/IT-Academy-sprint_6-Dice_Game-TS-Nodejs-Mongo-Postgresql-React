import { IPlayerRepository } from '../../core/repositories/IPlayerRepository';
import { IGameRepository } from '../../core/repositories/IGameRepository';
import { CreatePlayerDTO } from '../dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../dto/updatePlayer.dto';
import { PlayerDTO } from '../dto/player.dto';

class PlayerService {
  private playerRepository: IPlayerRepository;
  private gameRepository: IGameRepository;

  constructor(
    playerRepository: IPlayerRepository,
    gameRepository: IGameRepository
  ) {
    this.playerRepository = playerRepository;
    this.gameRepository = gameRepository;
  }

  async createPlayer(data: CreatePlayerDTO): Promise<PlayerDTO> {
    const player = await this.playerRepository.createPlayer(data);
    return {
      id: player.id,
      name: player.name,
      email: player.email,
      createdAt: player.createdAt,
      successRate: 0,
    };
  }

  // async findPlayerByEmail(email: string): Promise<PlayerDTO | null> {
  //   const player = await this.playerRepository.findPlayerByEmail(email);
  //   if (!player) {
  //     return null;
  //   }
  //   return {
  //     id: player.id,
  //     name: player.name,
  //     email: player.email,
  //     createdAt: player.createdAt
  //   };
  // }

  async updatePlayerName(data: UpdatePlayerDTO): Promise<PlayerDTO> {
    const player = await this.playerRepository.updatePlayerName(data);
    const games = await this.gameRepository.listGamesByPlayer(player.id);
    const successRate = games.length
      ? (games.filter(game => game.result).length / games.length) * 100
      : 0;
    return {
      id: player.id,
      name: player.name,
      email: player.email,
      createdAt: player.createdAt,
      successRate,
    };
  }

  async listAllPlayers(): Promise<PlayerDTO[]> {
    const players = await this.playerRepository.listAllPlayers();
    const playerDTOs: PlayerDTO[] = [];

    for (const player of players) {
      const games = await this.gameRepository.listGamesByPlayer(player.id);
      const successRate = games.length
        ? (games.filter(game => game.result).length / games.length) * 100
        : 0;
      playerDTOs.push({
        id: player.id,
        name: player.name,
        email: player.email,
        createdAt: player.createdAt,
        successRate,
      });
    }

    return playerDTOs;
  }

  // async deleteAllGamesForPlayer(playerId: string): Promise<void> {
  //   await this.playerRepository.deleteAllGamesForPlayer(playerId);
  // }
}

export default PlayerService;
