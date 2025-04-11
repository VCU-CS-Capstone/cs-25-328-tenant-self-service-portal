const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    
    req.user = decoded;
    next();
  });
};

const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.is_admin ? 'admin' : 'user';
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

const authenticateUser = verifyToken;
const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = {
  verifyToken,
  checkRole,
  authenticateUser,
  authorizeAdmin
};
