import { IRanking } from '../domain/entities/IRanking';

export interface IRankingRepository {
  getRankings(): Promise<IRanking[]>;
  getLoser(): Promise<IRanking | null>;
  getWinner(): Promise<IRanking | null>;
}
