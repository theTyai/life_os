const express = require('express');
const { getHabits, createHabit, toggleHabit } = require('../controllers/habits.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect); // Ensure only logged-in users can access

router.route('/')
  .get(getHabits)
  .post(createHabit);

router.post('/:id/toggle', toggleHabit);

module.exports = router;