export interface GameDTO {
  id: string;
  playerId: string;
  diceOne: number;
  diceTwo: number;
  result: boolean;
  createdAt: Date;
}
