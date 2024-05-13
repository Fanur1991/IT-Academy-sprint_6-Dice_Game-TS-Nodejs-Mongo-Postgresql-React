import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  diceOne: { type: Number, required: true },
  diceTwo: { type: Number, required: true },
  result: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
