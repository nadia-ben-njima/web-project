
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sellerId; 
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authenticateUser;
