// controllers/commentController.js

const db = require('../database/database');

// GET all comments (optionally with pagination)
const getAllComments = async (req, res) => {
  try {
    // You can add pagination or filters if you want
    const [rows] = await db.query('SELECT * FROM comments ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// GET a single comment by comment_id
const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const [rows] = await db.query('SELECT * FROM comments WHERE comment_id = ?', [commentId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ message: 'Error fetching comment' });
  }
};

// CREATE a new comment
const createComment = async (req, res) => {
  try {
    const { dataset_id, user_id, comment_text } = req.body;

    // Basic validation
    if (!dataset_id || !user_id || !comment_text) {
      return res.status(400).json({ message: 'Missing dataset_id, user_id, or comment_text' });
    }

    const insertQuery = `
      INSERT INTO comments (dataset_id, user_id, comment_text)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(insertQuery, [dataset_id, user_id, comment_text]);

    // If comment_id is auto-increment, result.insertId is the new ID
    // Optionally, return the newly created comment row
    const [newCommentRows] = await db.query(
      'SELECT * FROM comments WHERE comment_id = ?',
      [result.insertId]
    );

    res.status(201).json(newCommentRows[0]);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

// UPDATE an existing comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment_text } = req.body;

    // Basic validation
    if (!comment_text) {
      return res.status(400).json({ message: 'No comment_text provided' });
    }

    // Make sure the comment actually exists
    const [checkRows] = await db.query('SELECT * FROM comments WHERE comment_id = ?', [commentId]);
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const updateQuery = `
      UPDATE comments
      SET comment_text = ?
      WHERE comment_id = ?
    `;
    await db.query(updateQuery, [comment_text, commentId]);

    // Return the updated comment
    const [updatedRows] = await db.query('SELECT * FROM comments WHERE comment_id = ?', [commentId]);
    res.json(updatedRows[0]);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error updating comment' });
  }
};

// DELETE a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const [result] = await db.query('DELETE FROM comments WHERE comment_id = ?', [commentId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Typically we can return 204 or a success message
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
