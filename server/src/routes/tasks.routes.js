const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const Task = require('../models/Task');

// Protect all task routes
router.use(protect); 

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user_id: req.user.id });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;