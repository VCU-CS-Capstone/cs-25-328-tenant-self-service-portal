// routes/commentRoutes.js

const express = require('express');
const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', getAllComments);
router.get('/:commentId', getCommentById);
router.post('/', createComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
