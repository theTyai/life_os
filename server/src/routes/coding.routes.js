const express = require('express');
const { getProblems, createProblem, getStats } = require('../controllers/coding.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.get('/stats', getStats);

router.route('/')
  .get(getProblems)
  .post(createProblem);

module.exports = router;