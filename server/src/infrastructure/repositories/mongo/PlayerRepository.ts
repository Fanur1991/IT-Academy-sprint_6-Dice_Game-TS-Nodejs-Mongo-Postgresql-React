import Player from '../../../infrastructure/models/PlayerModel';
import { IPlayerRepository } from '../../../core/repositories/IPlayerRepository';

class PlayerRepository implements IPlayerRepository {
  async createPlayer(data: any): Promise<any> {
    const player = new Player(data);
    await player.save();
    return player;
  }

  async findPlayerById(id: string): Promise<any> {
    return Player.findById(id);
  }

  async updatePlayerName(id: string, name: string): Promise<any> {
    return Player.findByIdAndUpdate(id, { name }, { new: true });
  }

  async listAllPlayers(): Promise<any[]> {
    return Player.find({});
  }

  async deleteAllGamesForPlayer(playerId: string): Promise<any> {
    return Player.updateMany({ _id: playerId }, { $set: { games: [] } });
  }
}

export default PlayerRepository;
