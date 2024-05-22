import { Schema, model, Document } from 'mongoose';
import { IGameDocument } from './GameModel';

export interface IPlayerDocument extends Document {
  name: string;
  email: string;
  password: string;
  games: IGameDocument[];
  createdAt: Date;
}

const playerSchema: Schema = new Schema({
  name: { type: String, default: 'ANONYMOUS' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  createdAt: { type: Date, default: Date.now },
});

const PlayerModel = model<IPlayerDocument>('Player', playerSchema);

export default PlayerModel;
