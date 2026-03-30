const Task = require('../models/Task');
const Habit = require('../models/Habit');
const FocusSession = require('../models/FocusSession');
const CodingProblem = require('../models/CodingProblem');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todayStr = new Date().toISOString().split('T')[0];

    // Run aggregations concurrently for high performance
    const [tasks, habits, focus, coding] = await Promise.all([
      // 1. Task Stats
      Task.aggregate([
        { $match: { user_id: req.user._id } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      
      // 2. Habits Completed Today
      Habit.find({ user_id: userId, 'logs.date': todayStr, 'logs.completed': true }).countDocuments(),
      
      // 3. Focus Hours Today
      FocusSession.aggregate([
        { 
          $match: { 
            user_id: req.user._id, 
            completed: true,
            started_at: { $gte: new Date(new Date().setHours(0,0,0,0)) }
          } 
        },
        { $group: { _id: null, totalSeconds: { $sum: '$duration' } } }
      ]),

      // 4. Coding Problems Solved
      CodingProblem.countDocuments({ user_id: userId, status: 'solved' })
    ]);

    const focusHours = focus.length > 0 ? (focus[0].totalSeconds / 3600).toFixed(1) : 0;
    
    // Formatting the response for the frontend
    res.json({
      success: true,
      data: {
        tasks_distribution: tasks,
        habits_completed_today: habits,
        focus_hours_today: focusHours,
        total_problems_solved: coding
      }
    });
  } catch (err) { next(err); }
};