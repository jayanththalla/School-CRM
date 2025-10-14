require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5000', 'https://*.replit.dev', 'https://*.repl.co']
};