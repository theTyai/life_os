const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  platform: { 
    type: String, 
    enum: ['leetcode', 'codeforces', 'codechef', 'atcoder', 'other'], 
    required: true 
  },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  category: { type: String }, // e.g., 'dp', 'graphs', 'greedy'
  url: { type: String },
  status: { type: String, enum: ['solved', 'attempted', 'to_do'], default: 'solved' },
  time_taken: { type: Number }, // in minutes
  notes: { type: String },
  solution_code: { type: String },
  solved_at: { type: Date, default: Date.now }
}, { timestamps: true });

// Optimize queries for dashboard stats
codingProblemSchema.index({ user_id: 1, platform: 1 });
codingProblemSchema.index({ user_id: 1, difficulty: 1 });

module.exports = mongoose.model('CodingProblem', codingProblemSchema);