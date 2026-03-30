const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  icon: { type: String, default: '⭐' },
  target_days: { type: Number, default: 30 },
  streak: { type: Number, default: 0 },
  best_streak: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true },
  // Embedding logs directly into the habit document
  logs: [{
    date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
    completed: { type: Boolean, default: true }
  }]
}, { timestamps: true });

habitSchema.index({ user_id: 1 });

module.exports = mongoose.model('Habit', habitSchema);