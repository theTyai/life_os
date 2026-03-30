const Journal = require('../models/Journal');

exports.getEntries = async (req, res, next) => {
  try {
    const entries = await Journal.find({ user_id: req.user.id }).sort({ date: -1 });
    res.json({ success: true, count: entries.length, data: entries });
  } catch (err) { next(err); }
};

exports.saveEntry = async (req, res, next) => {
  try {
    const { date, mood, entry, wins, improvements } = req.body;
    
    // Upsert: Update if exists, create if it doesn't
    const journalEntry = await Journal.findOneAndUpdate(
      { user_id: req.user.id, date },
      { mood, entry, wins, improvements },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.status(200).json({ success: true, data: journalEntry });
  } catch (err) { next(err); }
};