const express = require('express');
const { getEntries, saveEntry } = require('../controllers/journal.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.route('/')
  .get(getEntries)
  .post(saveEntry);

module.exports = router;