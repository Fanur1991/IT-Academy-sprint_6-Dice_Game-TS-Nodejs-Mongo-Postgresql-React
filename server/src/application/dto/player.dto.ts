import { GameDTO } from './game.dto';

export interface PlayerDTO {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
  games?: GameDTO[];
  successRate?: number;
  password?: string | null;
}
