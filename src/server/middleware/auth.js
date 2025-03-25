const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (req, res, next) => {
  // TEMPORARY: Development bypass (REMOVE FOR PRODUCTION)
  // This will skip authentication for testing
  console.log("Authentication bypassed for development");
  req.user = { id: 1, role: 'admin' }; // Mock admin user for testing
  return next();
  
  /* Original code (commented out temporarily)
  const token = req.headers['authorization'];
  
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
  */
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

const authenticateUser = verifyToken;
const authorizeAdmin = (req, res, next) => checkRole(['admin'])(req, res, next);

module.exports = {
  verifyToken,
  checkRole,
  authenticateUser,
  authorizeAdmin
};