import { Router } from 'express';
import RankingService from '../services/rankingService';
import RankingController from '../controllers/rankingController';
import { getRankingRepository } from '../utils/getRepository';

const router = Router();
const playerRepository = getRankingRepository();
const rankingService = new RankingService(playerRepository);
const rankingController = new RankingController(rankingService);

// * Returns the ranking of players sorted by success percentage and the average success percentage of all players
router.get('/', rankingController.getRanking.bind(rankingController));

// * Returns the player with the worst success rate
router.get('/loser', rankingController.getLoser.bind(rankingController));

// * Returns the player with the best success rate
router.get('/winner', rankingController.getWinner.bind(rankingController));

export default router;
