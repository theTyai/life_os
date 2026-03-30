const mongoose = require('mongoose');

const focusSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Optional link to a task
  type: { type: String, enum: ['pomodoro', 'deep_work', 'short_break'], required: true },
  duration: { type: Number, required: true }, // In seconds
  completed: { type: Boolean, default: false },
  started_at: { type: Date, default: Date.now },
  ended_at: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('FocusSession', focusSchema);