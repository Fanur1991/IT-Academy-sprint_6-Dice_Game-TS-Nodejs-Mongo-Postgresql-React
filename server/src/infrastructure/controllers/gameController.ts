// src/controllers/gameController.ts
import { Request, Response } from 'express';
import GameService from '../../application/services/gameService';
import { CreateGameDTO } from '../../application/dto/createGame.dto';
import { GameDTO } from '../../application/dto/game.dto';
import { getRandomInt } from '../../utils/getRandomInt';

class GameController {
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  async createGame(req: Request, res: Response): Promise<Response> {
    try {
      const playerId: string = req.params.id;
      const diceOne: number = getRandomInt(1, 7);
      const diceTwo: number = getRandomInt(1, 7);
      const gameData: CreateGameDTO = { playerId, diceOne, diceTwo };
      const game = await this.gameService.createGame(gameData);
      return res.status(201).json(game);
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

  async listGamesByPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const playerId: string = req.params.id;
      const games: GameDTO[] = await this.gameService.listGamesByPlayer(
        playerId
      );
      return res.status(200).json(games);
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

  async deleteGamesByPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const playerId: string = req.params.id;
      const result = await this.gameService.deleteGamesByPlayer(playerId);
      return res.status(200).json(result);
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
}

export default GameController;
