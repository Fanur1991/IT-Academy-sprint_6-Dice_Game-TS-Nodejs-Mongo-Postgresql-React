interface IRankingPlayer {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IRanking {
  player: IRankingPlayer;
  successRate: number;
}
