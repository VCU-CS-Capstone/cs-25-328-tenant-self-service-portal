const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, is_admin } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO users (first_name, last_name, email, password, is_admin)
      VALUES (?, ?, ?, ?, ?)
    `;

    const adminValue = is_admin === true || is_admin === 1 || is_admin === "1" || is_admin === "true" ? 1 : 0;

    const [result] = await db.query(query, [
      first_name,
      last_name,
      email,
      hashedPassword,
      adminValue
    ]);

    const token = jwt.sign(
      {
        id: result.insertId,
        email,
        is_admin: !!adminValue
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      user: {
        id: result.insertId,
        first_name,
        last_name,
        email,
        is_admin: !!adminValue,
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        is_admin: !!user.is_admin
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN }
    );
    

    res.json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: !!user.is_admin,
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

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

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, email } = req.body;

    if (!first_name && !last_name && !email) {
      return res.status(400).json({ message: 'At least one field is required for update' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    if (email && email !== user.email) {
      const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ? AND id != ?', [email, userId]);
      if (existingUsers.length > 0) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }

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

    queryParams.push(userId);

    const query = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await db.query(query, queryParams);

    const [updatedUsers] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users WHERE id = ?', [userId]);

    res.json(updatedUsers[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const updateUserAdminStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_admin } = req.body;

    if (is_admin === undefined) {
      return res.status(400).json({ message: 'Admin status is required' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.query('UPDATE users SET is_admin = ? WHERE id = ?', [is_admin ? 1 : 0, userId]);

    const [updatedUsers] = await db.query('SELECT id, first_name, last_name, email, is_admin FROM users WHERE id = ?', [userId]);
    res.json(updatedUsers[0]);
  } catch (error) {
    console.error('Update admin status error:', error);
    res.status(500).json({ message: 'Error updating user admin status' });
  }
};

const validateToken = (req, res) => {
  res.json({ 
    valid: true, 
    user: {
      id: req.user.id,
      email: req.user.email,
      is_admin: req.user.is_admin
    }
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserAdminStatus,
  validateToken
};