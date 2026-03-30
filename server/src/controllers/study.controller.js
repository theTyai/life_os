const StudySubject = require('../models/StudySubject');

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await StudySubject.find({ user_id: req.user.id });
    res.json({ success: true, count: subjects.length, data: subjects });
  } catch (err) { next(err); }
};

exports.createSubject = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const subject = await StudySubject.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (err) { next(err); }
};

exports.addTopic = async (req, res, next) => {
  try {
    const subject = await StudySubject.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    subject.topics.push(req.body);
    await subject.save();
    res.json({ success: true, data: subject });
  } catch (err) { next(err); }
};

exports.toggleTopic = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const subject = await StudySubject.findOne({ _id: req.params.id, user_id: req.user.id });
    
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    const topic = subject.topics.id(topicId);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    topic.is_done = !topic.is_done;
    topic.completed_at = topic.is_done ? new Date() : null;

    await subject.save();
    res.json({ success: true, data: subject });
  } catch (err) { next(err); }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const subject = await StudySubject.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json({ success: true, data: {} });
  } catch (err) { next(err); }
};