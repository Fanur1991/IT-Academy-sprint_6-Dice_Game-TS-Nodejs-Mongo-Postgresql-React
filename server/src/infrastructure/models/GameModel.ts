import { Schema, model, Document } from 'mongoose';

export interface IGameDocument extends Document {
  playerId: string;
  diceOne: number;
  diceTwo: number;
  result: boolean;
  createdAt: Date;
}

const gameSchema: Schema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  diceOne: { type: Number, required: true },
  diceTwo: { type: Number, required: true },
  result: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GameModel = model<IGameDocument>('Game', gameSchema);

export default GameModel;
