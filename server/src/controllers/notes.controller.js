const Note = require('../models/Note');

exports.getNotes = async (req, res, next) => {
  try {
    // Allows filtering, e.g., ?category=algorithms or ?tags=dsa
    const filter = { user_id: req.user.id };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tags) filter.tags = { $in: req.query.tags.split(',') };

    const notes = await Note.find(filter).sort({ is_pinned: -1, updatedAt: -1 });
    res.json({ success: true, count: notes.length, data: notes });
  } catch (err) { next(err); }
};

exports.createNote = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const note = await Note.create(req.body);
    res.status(201).json({ success: true, data: note });
  } catch (err) { next(err); }
};

exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ success: true, data: note });
  } catch (err) { next(err); }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ success: true, data: {} });
  } catch (err) { next(err); }
};