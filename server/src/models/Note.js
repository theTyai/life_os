const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String },
  category: { 
    type: String, 
    enum: ['algorithms', 'web', 'systems', 'math', 'other'], 
    default: 'other' 
  },
  tags: [{ type: String }],
  is_pinned: { type: Boolean, default: false },
  is_favorite: { type: Boolean, default: false }
}, { timestamps: true });

noteSchema.index({ user_id: 1, category: 1 });
noteSchema.index({ tags: 1 }); // Useful for searching by tag

module.exports = mongoose.model('Note', noteSchema);