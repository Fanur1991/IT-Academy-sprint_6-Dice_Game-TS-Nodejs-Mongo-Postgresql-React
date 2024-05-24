import { GameDTO } from './game.dto';

export interface PlayerDTO {
  id: string;
  name: string;
  email?: string;
  password?: string | null;
  createdAt: Date;
  games?: GameDTO[];
  successRate?: number;
}
