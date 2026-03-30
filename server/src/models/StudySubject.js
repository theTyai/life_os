const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  is_done: { type: Boolean, default: false },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  completed_at: { type: Date }
});

const studySubjectSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  color: { type: String, default: '#4FFFB0' },
  topics: [topicSchema] // Embedded array of topics
}, { timestamps: true });

// Virtual to calculate progress percentage on the fly
studySubjectSchema.virtual('progress').get(function() {
  if (!this.topics || this.topics.length === 0) return 0;
  const completed = this.topics.filter(t => t.is_done).length;
  return Math.round((completed / this.topics.length) * 100);
});

// Ensure virtuals are included when converting to JSON
studySubjectSchema.set('toJSON', { virtuals: true });
studySubjectSchema.set('toObject', { virtuals: true });

studySubjectSchema.index({ user_id: 1 });

module.exports = mongoose.model('StudySubject', studySubjectSchema);