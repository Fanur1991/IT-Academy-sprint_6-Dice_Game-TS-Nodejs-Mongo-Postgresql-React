import { prisma } from '../../config/prismaConfig';
import { IGameRepository } from '../../../core/repositories/IGameRepository';

class GameRepository implements IGameRepository {
  async createGame(
    playerId: string,
    diceOne: number,
    diceTwo: number
  ): Promise<any> {
    const result = diceOne + diceTwo === 7;
    return prisma.game.create({
      data: {
        playerId: String(playerId),
        diceOne,
        diceTwo,
        result,
      },
    });
  }

  async listGamesByPlayer(playerId: string): Promise<any[]> {
    return prisma.game.findMany({
      where: {
        playerId: String(playerId),
      },
    });
  }

  async deleteGamesByPlayer(playerId: string): Promise<any> {
    return prisma.game.deleteMany({
      where: {
        playerId: String(playerId),
      },
    });
  }
}

export default GameRepository;
