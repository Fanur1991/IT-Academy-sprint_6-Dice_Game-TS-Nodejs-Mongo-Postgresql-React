import { Schema, model } from 'mongoose';

const gameSchema = new Schema(
  {
    playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
    diceOne: { type: Number, required: true },
    diceTwo: { type: Number, required: true },
    result: { type: String, required: true },
  },
  { timestamps: true }
);

export const GameModel = model('Game', gameSchema);
