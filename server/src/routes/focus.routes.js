const express = require('express');
const { logSession, getSessions } = require('../controllers/focus.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.route('/')
  .get(getSessions)
  .post(logSession);

module.exports = router;