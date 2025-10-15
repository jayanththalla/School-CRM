const mongoose = require('mongoose');

const { MONGODB_URI } = require('./environment');

// MongoDB connection string
const mongoUri = MONGODB_URI;

// Connection options - removed deprecated options
const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['parent', 'student', 'teacher', 'admin'], default: 'parent' },
  students: [{
    id: String,
    name: String,
    class: String,
    section: String
  }],
  profileImageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  subject: String,
  remarks: String,
  createdAt: { type: Date, default: Date.now }
});

// Exam Schema
const examSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  examName: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  maxMarks: { type: Number, required: true },
  grade: String,
  examDate: { type: Date, required: true },
  remarks: String,
  createdAt: { type: Date, default: Date.now }
});

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'pending' },
  marks: Number,
  maxMarks: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const OTP = mongoose.model('OTP', otpSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Exam = mongoose.model('Exam', examSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);

// Legacy in-memory storage (for backward compatibility during transition)
let users = [];
let otpStore = {};
let attendanceRecords = [];
let examRecords = [];
let assignmentRecords = [];

module.exports = {
  connectDB,
  User,
  OTP,
  Attendance,
  Exam,
  Assignment,
  // Legacy exports for backward compatibility
  users,
  otpStore,
  attendanceRecords,
  examRecords,
  assignmentRecords
};