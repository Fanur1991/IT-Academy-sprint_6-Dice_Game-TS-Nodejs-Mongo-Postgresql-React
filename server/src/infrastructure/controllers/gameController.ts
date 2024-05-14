// src/controllers/gameController.ts
import { Request, Response } from 'express';
import GameService from '../../application/services/gameService';

class GameController {
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  async createGame(req: Request, res: Response): Promise<Response> {
    try {
      const { playerId, diceOne, diceTwo } = req.body;
      const game = await this.gameService.createGame(
        playerId,
        diceOne,
        diceTwo
      );
      return res.status(201).json(game);
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

  async listGamesByPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const games = await this.gameService.listGamesByPlayer(
        req.params.playerId
      );
      return res.json(games);
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

  async deleteGamesByPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.gameService.deleteGamesByPlayer(
        req.params.playerId
      );
      return res.json({ message: 'Games deleted', result });
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
}

export default GameController;
