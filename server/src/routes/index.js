const express = require('express');
const authRoutes = require('./auth.routes');
const taskRoutes = require('./tasks.routes');
const habitRoutes = require('./habits.routes');
const codingRoutes = require('./coding.routes');
const studyRoutes = require('./study.routes');
const notesRoutes = require('./notes.routes');

// New Routes
const goalRoutes = require('./goals.routes');
const journalRoutes = require('./journal.routes');
const focusRoutes = require('./focus.routes');
const analyticsRoutes = require('./analytics.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/habits', habitRoutes);
router.use('/coding', codingRoutes);
router.use('/study', studyRoutes);
router.use('/notes', notesRoutes);
router.use('/goals', goalRoutes);
router.use('/journal', journalRoutes);
router.use('/focus', focusRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;