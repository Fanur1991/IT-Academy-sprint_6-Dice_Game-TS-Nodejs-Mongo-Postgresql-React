import { Router } from 'express';
import PlayerController from '../controllers/playerController';
import PlayerService from '../../application/services/playerService';
import {
  getPlayerRepository,
  getGameRepository,
} from '../../utils/getRepository';

const router = Router();
const playerRepository = getPlayerRepository();
const gameRepository = getGameRepository();
const playerService = new PlayerService(playerRepository, gameRepository);
const playerController = new PlayerController(playerService);

// * Creates a player
router.post('/', playerController.createPlayer.bind(playerController));

// * Changes the player name
router.put('/:id', playerController.updatePlayerName.bind(playerController));

// * Returns a list of all players on the system with their success percentage
router.get('/', playerController.listAllPlayers.bind(playerController));

export default router;
