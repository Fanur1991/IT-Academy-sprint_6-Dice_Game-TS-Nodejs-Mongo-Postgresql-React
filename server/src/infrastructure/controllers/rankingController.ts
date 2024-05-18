import { Request, Response } from 'express';
import RankingService from '../../application/services/rankingService';

class RankingController {
  private rankingService: RankingService;

  constructor(rankingService: RankingService) {
    this.rankingService = rankingService;
  }

  async getRankings(_req: Request, res: Response): Promise<Response> {
    try {
      const rankings = await this.rankingService.getRankings();
      return res.status(200).json(rankings);
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

  async getLoser(_req: Request, res: Response): Promise<Response> {
    try {
      const loser = await this.rankingService.getLoser();
      if (!loser) {
        return res.status(404).json({ message: 'No players found' });
      }
      return res.status(200).json(loser);
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

  async getWinner(_req: Request, res: Response): Promise<Response> {
    try {
      const winner = await this.rankingService.getWinner();
      if (!winner) {
        return res.status(404).json({ message: 'No players found' });
      }
      return res.status(200).json(winner);
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

  async getAverageSuccessRate(_req: Request, res: Response): Promise<Response> {
    try {
      const averageSuccessRate =
        await this.rankingService.getAverageSuccessRate();
      return res.status(200).json({ averageSuccessRate });
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

export default RankingController;
