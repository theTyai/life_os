const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  is_done: { type: Boolean, default: false },
  completed_at: { type: Date }
});

const goalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  deadline: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
  milestones: [milestoneSchema]
}, { timestamps: true });

// Virtual to calculate progress percentage automatically
goalSchema.virtual('progress').get(function() {
  if (!this.milestones || this.milestones.length === 0) return 0;
  const completed = this.milestones.filter(m => m.is_done).length;
  return Math.round((completed / this.milestones.length) * 100);
});

goalSchema.set('toJSON', { virtuals: true });
goalSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Goal', goalSchema);