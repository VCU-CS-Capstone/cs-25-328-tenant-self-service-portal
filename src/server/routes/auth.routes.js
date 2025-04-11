const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes - require authentication
router.get('/profile', authenticateUser, authController.getProfile);
router.put('/profile', authenticateUser, authController.updateProfile);
router.post('/change-password', authenticateUser, authController.changePassword);

// Admin routes - require admin privileges
router.get('/users', authenticateUser, authorizeAdmin, authController.getAllUsers);
router.post('/validate-token', authenticateUser, authController.validateToken);
router.patch('/users/:userId/admin-status', authenticateUser, authorizeAdmin, authController.updateUserAdminStatus);

module.exports = router;
