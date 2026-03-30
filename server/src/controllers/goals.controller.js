const Goal = require('../models/Goal');

exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user_id: req.user.id }).sort({ deadline: 1 });
    res.json({ success: true, count: goals.length, data: goals });
  } catch (err) { next(err); }
};

exports.createGoal = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const goal = await Goal.create(req.body);
    res.status(201).json({ success: true, data: goal });
  } catch (err) { next(err); }
};

exports.toggleMilestone = async (req, res, next) => {
  try {
    const { milestoneId } = req.params;
    const goal = await Goal.findOne({ _id: req.params.id, user_id: req.user.id });
    
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    const milestone = goal.milestones.id(milestoneId);
    if (!milestone) return res.status(404).json({ error: 'Milestone not found' });

    milestone.is_done = !milestone.is_done;
    milestone.completed_at = milestone.is_done ? new Date() : null;

    await goal.save();
    res.json({ success: true, data: goal });
  } catch (err) { next(err); }
};