const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try {
    // Allows filtering by status or category via query params (e.g., ?status=pending)
    const filter = { user_id: req.user.id, ...req.query };
    const tasks = await Task.find(filter).sort({ deadline: 1, createdAt: -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true, data: {} });
  } catch (err) { next(err); }
};