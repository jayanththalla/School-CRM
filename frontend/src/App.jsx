import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClassDiary from './components/ClassDiary';
import MockTests from './components/MockTests';
import Assignments from './components/Assignments';
import Attendance from './components/Attendance';
import ExamsAndMarks from './components/ExamsAndMarks';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import ProfileDashboard from './components/ProfileDashboard';
import Notifications from './components/Notifications';
import Timetable from './components/Timetable';
import Fee from './components/Fee';
import Chatbot from './components/Chatbot';
import DemoLogin from './pages/DemoLogin';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const studentName = user?.students?.[0]?.name || "Student";
  const profilePic = "https://www.w3schools.com/howto/img_avatar.png";
  const schoolName = "My School";
  const schoolLogo = "https://i.pinimg.com/originals/48/a3/54/48a354314bb3517dabc705eb3ee8b968.jpg";

  const hideHeaderPaths = ["/", "/login", "/dashboard", "/performance-analytics"];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header 
          studentName={studentName} 
          profilePic={profilePic} 
          schoolName={schoolName} 
          schoolLogo={schoolLogo} 
        />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<DemoLogin />} />
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/class-diary" element={
          <ProtectedRoute>
            <ClassDiary />
          </ProtectedRoute>
        } />
        <Route path="/mock-tests" element={
          <ProtectedRoute>
            <MockTests />
          </ProtectedRoute>
        } />
        <Route path="/assignments" element={
          <ProtectedRoute>
            <Assignments />
          </ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        } />
        <Route path="/exams-and-marks" element={
          <ProtectedRoute>
            <ExamsAndMarks />
          </ProtectedRoute>
        } />
        <Route path="/performance-analytics" element={
          <ProtectedRoute>
            <PerformanceAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileDashboard />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/timetable" element={
          <ProtectedRoute>
            <Timetable />
          </ProtectedRoute>
        } />
        <Route path="/fee" element={
          <ProtectedRoute>
            <Fee />
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Chatbot />
    </div>
  );
};

// AppWrapper: wraps ThemeProvider, AuthProvider, and Router
const AppWrapper = () => (
  <ThemeProvider>
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  </ThemeProvider>
);

export default AppWrapper;
