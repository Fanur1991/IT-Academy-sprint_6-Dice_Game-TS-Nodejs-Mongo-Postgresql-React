import { prisma } from '../../config/prismaConfig';
import { IGameRepository } from '../../interfaces/IGameRepository';

class GameRepository implements IGameRepository {
  async createGame(
    playerId: string,
    diceOne: number,
    diceTwo: number
  ): Promise<any> {
    const result = diceOne + diceTwo === 7;
    return prisma.game.create({
      data: {
        playerId: Number(playerId),
        diceOne,
        diceTwo,
        result,
      },
    });
  }

  async listGamesByPlayer(playerId: string): Promise<any[]> {
    return prisma.game.findMany({
      where: {
        playerId: Number(playerId),
      },
    });
  }

  async deleteGamesByPlayer(playerId: string): Promise<any> {
    return prisma.game.deleteMany({
      where: {
        playerId: Number(playerId),
      },
    });
  }
}

export default GameRepository;
