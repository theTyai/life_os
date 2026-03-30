const FocusSession = require('../models/FocusSession');

exports.logSession = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const session = await FocusSession.create(req.body);
    res.status(201).json({ success: true, data: session });
  } catch (err) { next(err); }
};

exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await FocusSession.find({ user_id: req.user.id }).sort({ started_at: -1 });
    res.json({ success: true, count: sessions.length, data: sessions });
  } catch (err) { next(err); }
};