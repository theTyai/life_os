const Habit = require('../models/Habit'); // Using your exact file name

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user_id: req.user.id });
    res.status(200).json({ success: true, count: habits.length, data: habits });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new habit
// @route   POST /api/habits
exports.createHabit = async (req, res) => {
  try {
    const { name, icon, target_days } = req.body;
    
    const habit = await Habit.create({
      user_id: req.user.id, // Linking to your user!
      name,
      icon,
      target_days
    });

    res.status(201).json({ success: true, data: habit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Toggle a habit for a specific date (e.g., today)
// @route   POST /api/habits/:id/toggle
exports.toggleHabit = async (req, res) => {
  try {
    const { date } = req.body; // Expecting 'YYYY-MM-DD' from the frontend
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, error: 'Habit not found' });
    }

    if (habit.user_id.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    // Check if this date is already logged
    const existingLogIndex = habit.logs.findIndex(log => log.date === date);

    if (existingLogIndex !== -1) {
      // If it exists, remove it (user is un-checking the habit)
      habit.logs.splice(existingLogIndex, 1);
    } else {
      // If it doesn't exist, add it (user is checking the habit)
      habit.logs.push({ date, completed: true });
    }

    // Basic streak calculation (Optional: We can make this much more advanced later!)
    habit.streak = habit.logs.length;
    if (habit.streak > habit.best_streak) {
      habit.best_streak = habit.streak;
    }

    await habit.save();
    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};