import { Request, Response } from 'express';
import PlayerService from '../services/playerService';

class PlayerController {
  private playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  async createPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const player = await this.playerService.createPlayer(data);
      return res.status(201).json(player);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
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
      const id = req.params.id;
      const name = req.body.name;
      const player = await this.playerService.updatePlayerName(id, name);
      return res.json(player);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async listAllPlayers(_req: Request, res: Response): Promise<Response> {
    try {
      const players = await this.playerService.listAllPlayers();
      return res.json(players);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'An unexpected error occurred' });
      }
    }
  }

  // async deleteAllGamesForPlayer(
  //   req: Request,
  //   res: Response
  // ): Promise<Response> {
  //   try {
  //     const id = req.params.id;
  //     const player = await this.playerService.deleteAllGamesForPlayer(id);
  //     return res.json(player);
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
}

export default PlayerController;
