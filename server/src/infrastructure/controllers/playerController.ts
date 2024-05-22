import { Request, Response } from 'express';
import PlayerService from '../../application/services/playerService';
import { CreatePlayerDTO } from '../../application/dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../../application/dto/updatePlayer.dto';
import { PlayerDTO } from '../../application/dto/player.dto';

class PlayerController {
  private playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  async createPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const playerData: CreatePlayerDTO = req.body;
      const player = await this.playerService.createPlayer(playerData);
      return res.status(201).json(player);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'An unexpected error occurred' });
      }
    }
  }

  // async getPlayerById(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const id = req.params.id;
  //     const player = await this.playerService.findPlayerById(id);
  //     if (player) {
  //       return res.json(player);
  //     } else {
  //       return res.status(404).json({ message: 'Player not found' });
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return res.status(500).json({ message: error.message });
  //     } else {
  //       return res
  //         .status(500)
  //         .json({ message: 'An unexpected error occurred' });
  //     }
  //   }
  // }

  async updatePlayerName(req: Request, res: Response): Promise<Response> {
    try {
      const id: string = req.params.id;
      const name: string = req.body.name;
      const data: UpdatePlayerDTO = {
        name,
        id,
      };
      const updatedPlayer: PlayerDTO =
        await this.playerService.updatePlayerName(data);
      return res.status(200).json(updatedPlayer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'An unexpected error occurred' });
      }
    }
  }

  // async updatePlayerName (req: Request, res: Response): Promise<Response> {
  //   const playerId: string = req.params.id;
  //   const updateData: UpdatePlayerDTO = req.body;
  //   try {
  //     const updatedPlayer: PlayerDTO = await this.playerService.updatePlayerName(playerId, updateData.name);
  //     return res.status(200).json(updatedPlayer);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //             return res.status(400).json({ message: error.message });
  //           } else {
  //             return res
  //               .status(500)
  //               .json({ message: 'An unexpected error occurred' });
  //           }
  //   }
  // };

  async listAllPlayers(_req: Request, res: Response): Promise<Response> {
    try {
      const players: PlayerDTO[] = await this.playerService.listAllPlayers();
      return res.status(200).json(players);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'An unexpected error occurred' });
      }
    }
  }

  //   async deleteAllGamesForPlayer(
  //     req: Request,
  //     res: Response
  //   ): Promise<Response> {
  //     try {
  //       const id = req.params.id;
  //       const player = await this.playerService.deleteAllGamesForPlayer(id);
  //       return res.json(player);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         return res.status(500).json({ message: error.message });
  //       } else {
  //         return res
  //           .status(500)
  //           .json({ message: 'An unexpected error occurred' });
  //       }
  //     }
  //   }
}

export default PlayerController;
