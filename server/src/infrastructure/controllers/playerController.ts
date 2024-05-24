import { Request, Response } from 'express';
import PlayerService from '../../application/services/playerService';
import { AuthService } from '../../application/services/authService';
import { CreatePlayerDTO } from '../../application/dto/createPlayer.dto';
import { UpdatePlayerDTO } from '../../application/dto/updatePlayer.dto';
import { PlayerDTO } from '../../application/dto/player.dto';

class PlayerController {
  private playerService: PlayerService;
  private authService: AuthService;

  constructor(playerService: PlayerService, authService: AuthService) {
    this.playerService = playerService;
    this.authService = authService;
  }

  async createPlayer(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body as CreatePlayerDTO;

      // Hash password
      const hashedPassword = await this.authService.hashPassword(password);
      const playerData = { name, email, password: hashedPassword };

      const player = await this.playerService.createPlayer(playerData);

      // Generate token
      const token = this.authService.generateToken(player.id);

      return res.status(201).json({
        id: player.id,
        name: player.name,
        email: player.email,
        token,
      });
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

  async updatePlayerName(req: Request, res: Response): Promise<Response> {
    try {
      const id: string = req.params.id;
      const name: string = req.body.name;
      const data: UpdatePlayerDTO = {
        name,
        id,
      };
      const updatedPlayer: PlayerDTO =
        await this.playerService.updatePlayerName(data);
      return res.status(200).json(updatedPlayer);
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

  async listAllPlayers(_req: Request, res: Response): Promise<Response> {
    try {
      const players: PlayerDTO[] = await this.playerService.listAllPlayers();
      return res.status(200).json(players);
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

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as { email: string; password: string };
    const player = await this.playerService.findPlayerByEmail(email);

    if (
      player &&
      (await this.authService.comparePasswords(password, player.password))
    ) {
      const token = this.authService.generateToken(player.id);

      return res.json({ ...player, token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}

export default PlayerController;
