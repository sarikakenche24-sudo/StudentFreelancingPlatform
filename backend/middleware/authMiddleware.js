const jwt = require('jsonwebtoken');
let User;
try {
  User = require('../models/User');
} catch (e) {
  User = require('../models/user');
}

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'skillbridge_super_jwt_secret_key_2026');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token failed, not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided, not authorized' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user.role}) is not allowed to access this resource` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
