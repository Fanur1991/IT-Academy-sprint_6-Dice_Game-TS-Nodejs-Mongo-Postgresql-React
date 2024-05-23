import { Router } from 'express';
import PlayerController from '../controllers/playerController';
import { AuthService } from '../../application/services/authService';
import PlayerService from '../../application/services/playerService';
import {
  getPlayerRepository,
  getGameRepository,
} from '../../utils/getRepository';
import { requireAuth } from '.././middleware/authMiddleware';

const router = Router();
const playerRepository = getPlayerRepository();
const gameRepository = getGameRepository();
const playerService = new PlayerService(playerRepository, gameRepository);
const authService = new AuthService();
const playerController = new PlayerController(playerService, authService);

// * Login a player
router.post('/login', playerController.login.bind(playerController));

// * Creates a player
router.post('/', playerController.createPlayer.bind(playerController));

// * Changes the player name
router.put(
  '/:id',
  requireAuth,
  playerController.updatePlayerName.bind(playerController)
);

// * Returns a list of all players on the system with their success percentage
router.get(
  '/',
  requireAuth,
  playerController.listAllPlayers.bind(playerController)
);

export default router;
