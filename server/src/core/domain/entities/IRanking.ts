interface IRankingPlayer {
  id: string;
  name: string;
  createdAt: Date;
}

export interface IRanking {
  player: IRankingPlayer;
  successRate: number;
}
