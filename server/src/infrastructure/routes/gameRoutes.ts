import { Router } from 'express';
import GameController from '../controllers/gameController';
import GameService from '../../application/services/gameService';
import { getGameRepository } from '../../utils/getRepository';

const router = Router();
const gameRepository = getGameRepository();
const gameService = new GameService(gameRepository);
const gameController = new GameController(gameService);

// * A specific player rolls
router.post('/:id', gameController.createGame.bind(gameController));

// * Deletes a player's throws
router.delete('/:id', gameController.deleteGamesByPlayer.bind(gameController));

// * Returns a list of throws for a specific player
router.get('/:id', gameController.listGamesByPlayer.bind(gameController));

export default router;
