import { IPlayerRepository } from '../../../core/repositories/IPlayerRepository';
import { prisma } from '../../config/prismaConfig';

class PlayerRepository implements IPlayerRepository {
  async createPlayer(data: any): Promise<any> {
    return prisma.player.create({
      data: data,
    });
  }

  async findPlayerById(id: string): Promise<any> {
    return prisma.player.findUnique({
      where: { id: String(id) },
    });
  }

  async updatePlayerName(id: string, name: string): Promise<any> {
    return prisma.player.update({
      where: { id: String(id) },
      data: { name },
    });
  }

  async listAllPlayers(): Promise<any[]> {
    return prisma.player.findMany({});
  }

  async deleteAllGamesForPlayer(playerId: string): Promise<any> {
    return prisma.game.deleteMany({
      where: { playerId: String(playerId) },
    });
  }
}

export default PlayerRepository;
