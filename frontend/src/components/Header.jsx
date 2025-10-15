import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = ({ studentName, profilePic, schoolName, schoolLogo }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 dark:bg-blue-900 transition-colors duration-300 shadow-lg">
      <div className="flex items-center space-x-3">
        <img
          src={schoolLogo}
          alt="School Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-bold text-white">{schoolName}</span>
      </div>

      {/* Profile Section with Theme Toggle */}
      <div className="flex items-center space-x-6">
        {/* Theme Toggle Button */}
        <div className="flex flex-col items-center">
          <ThemeToggle />
          <span className="text-xs text-white/80 mt-1 hidden sm:block">Theme</span>
        </div>

        {/* Profile Picture and User Name */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-white/90 hidden md:block">{studentName}</span>
            <button
              onClick={handleProfileClick}
              className="text-xs text-blue-100 hover:text-white transition-colors"
            >
              View Profile
            </button>
          </div>
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-white/50 transition-all duration-200"
            onClick={handleProfileClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;