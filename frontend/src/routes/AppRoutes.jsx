import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages
import Home from '../pages/Home';
import DemoLogin from '../pages/DemoLogin';
import Signup from '../pages/Signup';

// Components
import Dashboard from '../components/Dashboard';
import ClassDiary from '../components/ClassDiary';
import MockTests from '../components/MockTests';
import Assignments from '../components/Assignments';
import Attendance from '../components/Attendance';
import ExamsAndMarks from '../components/ExamsAndMarks';
import PerformanceAnalytics from '../components/PerformanceAnalytics';
import ProfileDashboard from '../components/ProfileDashboard';
import Notifications from '../components/Notifications';
import Timetable from '../components/Timetable';
import Fee from '../components/Fee';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<DemoLogin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes - Main Dashboard */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            {/* Protected Routes - Academic */}
            <Route path="/class-diary" element={
                <ProtectedRoute>
                    <ClassDiary />
                </ProtectedRoute>
            } />

            <Route path="/assignments" element={
                <ProtectedRoute>
                    <Assignments />
                </ProtectedRoute>
            } />

            <Route path="/exams-and-marks" element={
                <ProtectedRoute>
                    <ExamsAndMarks />
                </ProtectedRoute>
            } />

            <Route path="/mock-tests" element={
                <ProtectedRoute>
                    <MockTests />
                </ProtectedRoute>
            } />

            {/* Protected Routes - Student Info */}
            <Route path="/attendance" element={
                <ProtectedRoute>
                    <Attendance />
                </ProtectedRoute>
            } />

            <Route path="/performance-analytics" element={
                <ProtectedRoute>
                    <PerformanceAnalytics />
                </ProtectedRoute>
            } />

            <Route path="/timetable" element={
                <ProtectedRoute>
                    <Timetable />
                </ProtectedRoute>
            } />

            {/* Protected Routes - Account */}
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

            <Route path="/fee" element={
                <ProtectedRoute>
                    <Fee />
                </ProtectedRoute>
            } />

            {/* Catch all - redirect to dashboard if authenticated, otherwise to home */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

export default AppRoutes;