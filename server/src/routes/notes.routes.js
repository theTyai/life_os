const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notes.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/:id')
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;