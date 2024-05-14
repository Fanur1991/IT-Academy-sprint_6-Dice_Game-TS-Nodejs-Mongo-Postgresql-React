import { Schema, model } from 'mongoose';

const playerSchema = new Schema(
  {
    name: { type: String, default: 'ANONYMOUS' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { timestamps: true }
);

export const PlayerModel = model('Player', playerSchema);
