import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClassDiary from './components/ClassDiary';
import MockTests from './components/MockTests';
import Assignments from './components/Assignments';
import Attendance from './components/Attendance';
import ExamsAndMarks from './components/ExamsAndMarks';
import ProfileDashboard from './components/ProfileDashboard';
import Notifications from './components/Notifications';
import Timetable from './components/Timetable';
import Fee from './components/Fee';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  const studentName = "John Doe"; // Replace with dynamic data as needed
  const profilePic = "https://www.w3schools.com/howto/img_avatar.png"; // Sample profile image
  const schoolName = "My School";
  const schoolLogo = "https://i.pinimg.com/originals/48/a3/54/48a354314bb3517dabc705eb3ee8b968.jpg"; // Sample school logo image

  const location = useLocation();
  const hideHeaderPaths = ["/", "/login", "/signup", "/dashboard"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header 
          studentName={studentName} 
          profilePic={profilePic} 
          schoolName={schoolName} 
          schoolLogo={schoolLogo} 
        />
      )}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class-diary" element={<ClassDiary />} />
        <Route path="/mock-tests" element={<MockTests />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/exams-and-marks" element={<ExamsAndMarks />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/fee" element={<Fee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
