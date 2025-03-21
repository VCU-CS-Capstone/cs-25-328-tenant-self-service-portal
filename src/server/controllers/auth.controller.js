const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Register a new user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, is_admin } = req.body;

        // Validate input
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const query = `
            INSERT INTO users (first_name, last_name, email, password, is_admin)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        // Default to non-admin if not specified
        const adminValue = is_admin === true ? 1 : 0;
        
        const [result] = await db.query(query, [
            first_name,
            last_name,
            email,
            hashedPassword,
            adminValue
        ]);

        // Create token
        const token = jwt.sign(
            { 
                id: result.insertId,
                email,
                is_admin: !!adminValue
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Return user info (without password)
        res.status(201).json({
            id: result.insertId,
            first_name,
            last_name,
            email,
            is_admin: !!adminValue,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

/**
 * Login a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                is_admin: !!user.is_admin
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Return user info (without password)
        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            is_admin: !!user.is_admin,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

/**
 * Get current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [users] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users WHERE id = ?', [userId]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

/**
 * Update user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { first_name, last_name, email } = req.body;

        // Validate input
        if (!first_name && !last_name && !email) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ? AND id != ?', [email, userId]);
            if (existingUsers.length > 0) {
                return res.status(409).json({ message: 'Email already in use' });
            }
        }

        // Build update query
        let updateFields = [];
        let queryParams = [];

        if (first_name) {
            updateFields.push('first_name = ?');
            queryParams.push(first_name);
        }

        if (last_name) {
            updateFields.push('last_name = ?');
            queryParams.push(last_name);
        }

        if (email) {
            updateFields.push('email = ?');
            queryParams.push(email);
        }

        // Add user ID as the last parameter
        queryParams.push(userId);

        const query = `
            UPDATE users 
            SET ${updateFields.join(', ')} 
            WHERE id = ?
        `;

        await db.query(query, queryParams);

        // Fetch updated user
        const [updatedUsers] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users WHERE id = ?', [userId]);
        
        res.json(updatedUsers[0]);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
};

/**
 * Change user password
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Error changing password' });
    }
};

/**
 * Get all users (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getAllUsers = async (req, res) => {
    try {
        // This should be protected by admin middleware
        const [users] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users');
        res.json(users);
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

/**
 * Update user admin status (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateUserAdminStatus = async (req, res) => {
    try {
        // This should be protected by admin middleware
        const { userId } = req.params;
        const { is_admin } = req.body;

        if (is_admin === undefined) {
            return res.status(400).json({ message: 'Admin status is required' });
        }

        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update admin status
        await db.query('UPDATE users SET is_admin = ? WHERE id = ?', [is_admin ? 1 : 0, userId]);

        // Fetch updated user
        const [updatedUsers] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users WHERE id = ?', [userId]);
        
        res.json(updatedUsers[0]);
    } catch (error) {
        console.error('Update admin status error:', error);
        res.status(500).json({ message: 'Error updating user admin status' });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    updateUserAdminStatus
};
