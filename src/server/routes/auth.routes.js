// auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
