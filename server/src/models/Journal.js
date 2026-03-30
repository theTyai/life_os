const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD for easy querying
  mood: { type: String },
  entry: { type: String },
  wins: { type: String },
  improvements: { type: String }
}, { timestamps: true });

// Ensure only one entry per user per day
journalSchema.index({ user_id: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Journal', journalSchema);