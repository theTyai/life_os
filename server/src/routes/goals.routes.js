const express = require('express');
const { getGoals, createGoal, toggleMilestone } = require('../controllers/goals.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.route('/')
  .get(getGoals)
  .post(createGoal);

router.patch('/:id/milestones/:milestoneId/toggle', toggleMilestone);

module.exports = router;