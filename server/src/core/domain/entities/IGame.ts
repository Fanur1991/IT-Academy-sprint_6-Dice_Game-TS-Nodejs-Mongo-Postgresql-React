export interface IGame {
  id: string;
  playerId: string;
  diceOne: number;
  diceTwo: number;
  result: boolean;
  createdAt: Date;
}
