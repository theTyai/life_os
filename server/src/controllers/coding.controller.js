const CodingProblem = require('../models/CodingProblem');

exports.getProblems = async (req, res, next) => {
  try {
    const filter = { user_id: req.user.id, ...req.query };
    const problems = await CodingProblem.find(filter).sort({ solved_at: -1 });
    res.json({ success: true, count: problems.length, data: problems });
  } catch (err) { next(err); }
};

exports.createProblem = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const problem = await CodingProblem.create(req.body);
    res.status(201).json({ success: true, data: problem });
  } catch (err) { next(err); }
};

// Aggregation pipeline to get dashboard statistics
exports.getStats = async (req, res, next) => {
  try {
    const stats = await CodingProblem.aggregate([
      { $match: { user_id: req.user._id, status: 'solved' } },
      { 
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalSolved = await CodingProblem.countDocuments({ user_id: req.user.id, status: 'solved' });

    res.json({ 
      success: true, 
      data: {
        total: totalSolved,
        distribution: stats
      } 
    });
  } catch (err) { next(err); }
};