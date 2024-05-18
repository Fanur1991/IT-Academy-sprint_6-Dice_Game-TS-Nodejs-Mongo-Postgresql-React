import { IPlayerRepository } from '../../../core/repositories/IPlayerRepository';
import { IPlayer } from '../../../core/domain/entities/IPlayer';
import { prisma } from '../../config/prismaConfig';
import { CreatePlayerDTO } from '../../../application/dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../../../application/dto/updatePlayer.dto';

class PlayerRepository implements IPlayerRepository {
  async createPlayer(data: CreatePlayerDTO): Promise<IPlayer> {
    return prisma.player.create({
      data: data,
    });
  }

  // async findPlayerById(id: string): Promise<any> {
  //   return prisma.player.findUnique({
  //     where: { id: String(id) },
  //   });
  // }

  async updatePlayerName(data: UpdatePlayerDTO): Promise<IPlayer> {
    return prisma.player.update({
      where: { id: data.playerId },
      data: { name: data.name },
    });
  }

  async listAllPlayers(): Promise<IPlayer[]> {
    return prisma.player.findMany({});
  }

  // async deleteAllGamesForPlayer(playerId: string): Promise<any> {
  //   return prisma.game.deleteMany({
  //     where: { playerId: String(playerId) },
  //   });
  // }
}

export default PlayerRepository;
