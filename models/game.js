const mongoose = require('../config/database')
const { Schema } = mongoose

// const cardSchema = new Schema({
//   symbol: { type: String, required: true },
//   visible: { type: Boolean, default: false },
//   won: { type: Boolean, default: false },
// });

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
});

const gridSchema = new Schema({
  tileIndex: {type: Number},
  content: {type: Number},
  clicked: {type: String, default: "false"},
  userId: { type: Schema.Types.ObjectId, ref: 'users' }
})

const gameSchema = new Schema({
  players: [playerSchema],
  started: { type: Boolean, default: false },
  winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  grid: [gridSchema]
});

module.exports = mongoose.model('games', gameSchema)
