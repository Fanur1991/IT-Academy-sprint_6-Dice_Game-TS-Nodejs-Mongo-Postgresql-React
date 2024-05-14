import { Router } from 'express';
import GameController from '../controllers/gameController';
import GameService from '../../application/services/gameService';
import { getGameRepository } from '../../utils/getRepository';

const router = Router();
const gameRepository = getGameRepository();
const playerService = new GameService(gameRepository);
const playerController = new GameController(playerService);

// * A specific player rolls
router.post('/:id', playerController.createGame.bind(playerController));

// * Deletes a player's throws
router.delete(
  '/:id',
  playerController.deleteGamesByPlayer.bind(playerController)
);

// * Returns a list of throws for a specific player
router.get('/:id', playerController.listGamesByPlayer.bind(playerController));

export default router;
