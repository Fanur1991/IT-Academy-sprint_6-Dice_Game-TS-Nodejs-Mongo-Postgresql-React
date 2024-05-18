import { IGame } from './IGame';

export interface IPlayer {
  id: string;
  name: string;
  email?: string;
  password?: string;
  games?: IGame[];
  createdAt: Date;
}
