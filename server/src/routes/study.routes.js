const express = require('express');
const { getSubjects, createSubject, addTopic, toggleTopic, deleteSubject } = require('../controllers/study.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.route('/')
  .get(getSubjects)
  .post(createSubject);

router.route('/:id')
  .delete(deleteSubject);

router.post('/:id/topics', addTopic);
router.patch('/:id/topics/:topicId/toggle', toggleTopic);

module.exports = router;