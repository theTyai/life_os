const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['study', 'coding', 'health', 'project', 'personal', 'other'], default: 'study' },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  deadline: { type: Date },
  estimated_time: { type: Number },
  actual_time: { type: Number },
  tags: [{ type: String }],
  is_recurring: { type: Boolean, default: false },
  recurrence: { type: String, enum: ['daily', 'weekly', 'monthly'] },
  completed_at: { type: Date }
}, { timestamps: true });

// Indexing for faster queries based on the architecture doc
taskSchema.index({ user_id: 1, status: 1 });
taskSchema.index({ deadline: 1 });

module.exports = mongoose.model('Task', taskSchema);