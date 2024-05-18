import { Router } from 'express';
import RankingController from '../controllers/rankingController';
import RankingService from '../../application/services/rankingService';
import { getRankingRepository } from '../../utils/getRepository';

const router = Router();
const rankingRepository = getRankingRepository();
const rankingService = new RankingService(rankingRepository);
const rankingController = new RankingController(rankingService);

// * Returns the ranking of players sorted by success percentage and the average success percentage of all players
router.get('/', rankingController.getRankings.bind(rankingController));

// * Returns the player with the worst success rate
router.get('/loser', rankingController.getLoser.bind(rankingController));

// * Returns the player with the best success rate
router.get('/winner', rankingController.getWinner.bind(rankingController));

export default router;
