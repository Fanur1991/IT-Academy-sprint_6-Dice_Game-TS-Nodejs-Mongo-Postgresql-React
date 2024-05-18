import { prisma } from '../../config/prismaConfig';
import { IGameRepository } from '../../../core/repositories/IGameRepository';
import { IGame } from '../../../core/domain/entities/IGame';
import { CreateGameDTO } from '../../../application/dto/createGame.dto';

class GameRepository implements IGameRepository {
  async createGame(data: CreateGameDTO & { result: boolean }): Promise<IGame> {
    return prisma.game.create({
      data,
    });
  }

  async listGamesByPlayer(playerId: string): Promise<IGame[]> {
    return prisma.game.findMany({
      where: { playerId },
    });
  }

  async deleteGamesByPlayer(playerId: string): Promise<{ message: string }> {
    await prisma.game.deleteMany({
      where: { playerId },
    });
    return { message: 'Games deleted successfully' };
  }
}

export default GameRepository;
