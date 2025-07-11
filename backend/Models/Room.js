const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomId: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    platform: { type: String, required: true },
    videoLink: { type: String },
    members: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  });
const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;