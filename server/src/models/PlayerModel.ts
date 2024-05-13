import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, default: 'ANONYMOUS' },
  registrationDate: { type: Date, default: Date.now },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
