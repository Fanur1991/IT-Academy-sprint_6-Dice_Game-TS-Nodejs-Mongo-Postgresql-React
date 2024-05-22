import { IPlayerRepository } from '../../../core/repositories/IPlayerRepository';
import { IPlayer } from '../../../core/domain/entities/IPlayer';
import PlayerModel from '../../models/PlayerModel';
import { CreatePlayerDTO } from '../../../application/dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../../../application/dto/updatePlayer.dto';

class PlayerRepository implements IPlayerRepository {
  async createPlayer(data: CreatePlayerDTO): Promise<IPlayer> {
    const player = new PlayerModel({
      ...data,
      createdAt: new Date(),
    });
    await player.save();
    return player.toObject({ getters: true }) as IPlayer;
  }

  // async findPlayerById(id: string): Promise<IPlayer> {
  //   const player = await PlayerModel.findById(id);
  //   return player ? player.toObject() : null;
  // }

  async updatePlayerName(data: UpdatePlayerDTO): Promise<IPlayer> {
    const player = await PlayerModel.findByIdAndUpdate(
      data.id,
      { name: data.name },
      { new: true }
    );
    if (!player) throw new Error('Player not found');
    return player.toObject({ getters: true }) as IPlayer;
  }

  async listAllPlayers(): Promise<IPlayer[]> {
    const players = await PlayerModel.find({}).populate('games');
    console.log(players);

    return players.map(player => player.toObject({ getters: true }) as IPlayer);
  }

  // async deleteAllGamesForPlayer(
  //   playerId: string
  // ): Promise<{ message: string }> {
  //   await GameModel.deleteMany({ playerId });
  //   return { message: 'All games deleted' };
  // }

  // async findPlayerByEmail(email: string): Promise<IPlayer | null> {
  //   const player = await PlayerModel.findOne({ email });
  //   return player ? player.toObject() : null;
  // }
}

export default PlayerRepository;
