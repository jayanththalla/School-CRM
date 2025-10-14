const cors = require('cors');
const { CORS_ORIGINS } = require('../config/environment');

const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed patterns
    const allowedPatterns = [
      /^http:\/\/localhost:5000$/,
      /^https:\/\/.*\.replit\.dev$/,
      /^https:\/\/.*\.repl\.co$/
    ];
    
    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
});

module.exports = { corsMiddleware };