import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import AppRoutes from './routes/AppRoutes';

const Layout = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { isDarkMode } = useTheme();

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const studentName = user?.students?.[0]?.name || "Student";
  const profilePic = user?.profileImageUrl || "https://www.w3schools.com/howto/img_avatar.png";
  const schoolName = "My School";
  const schoolLogo = "https://i.pinimg.com/originals/48/a3/54/48a354314bb3517dabc705eb3ee8b968.jpg";

  // Define paths where header should be hidden
  const hideHeaderPaths = ["/", "/login", "/signup", "/dashboard"];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {user && !hideHeaderPaths.includes(location.pathname) && (
        <Header
          studentName={studentName}
          profilePic={profilePic}
          schoolName={schoolName}
          schoolLogo={schoolLogo}
        />
      )}

      <AppRoutes />

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