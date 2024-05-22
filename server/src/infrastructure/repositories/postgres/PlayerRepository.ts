import { IPlayerRepository } from '../../../core/repositories/IPlayerRepository';
import { IPlayer } from '../../../core/domain/entities/IPlayer';
import { prisma } from '../../config/prismaConfig';
import { CreatePlayerDTO } from '../../../application/dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../../../application/dto/updatePlayer.dto';

class PlayerRepository implements IPlayerRepository {
  async createPlayer(data: CreatePlayerDTO): Promise<IPlayer> {
    const player = prisma.player.create({
      data: data,
      include: {
        games: true,
      },
    });
    return player;
  }

  // async findPlayerById(id: string): Promise<any> {
  //   return prisma.player.findUnique({
  //     where: { id: String(id) },
  //   });
  // }

  async updatePlayerName(data: UpdatePlayerDTO): Promise<IPlayer> {
    const player = prisma.player.update({
      where: { id: data.id },
      data: { name: data.name },
      include: {
        games: true,
      },
    });
    return player;
  }

  async listAllPlayers(): Promise<IPlayer[]> {
    const players = prisma.player.findMany({
      include: {
        games: true,
      },
    });
    return players;
  }

  // async deleteAllGamesForPlayer(playerId: string): Promise<any> {
  //   return prisma.game.deleteMany({
  //     where: { playerId: String(playerId) },
  //   });
  // }
}

export default PlayerRepository;
