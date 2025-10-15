require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://jayanththalla33:jayanththalla33@cluster0.qfpuofn.mongodb.net/school-crm?retryWrites=true&w=majority&appName=Cluster0',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5000', 'http://localhost:5173', 'https://*.replit.dev', 'https://*.repl.co']
};