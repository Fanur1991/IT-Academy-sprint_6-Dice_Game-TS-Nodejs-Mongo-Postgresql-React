export interface IRankingRepository {
  getRankings(): Promise<any[]>;
  getLoser(): Promise<any>;
  getWinner(): Promise<any>;
}
