const express = require('express');
const { getDashboardStats } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);

module.exports = router;