import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ studentName, profilePic, schoolName, schoolLogo }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <header className="flex justify-between items-center p-1 bg-blue-600">
      <div className="flex flex-col items-center">
        <img
          src={schoolLogo}
          alt="School Logo"
          className="w-8 h-8 rounded-full mt-2"
        />
        <span className="text-lg font-semibold text-white">{schoolName}</span>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full mt-2 cursor-pointer" // Add cursor-pointer for better UX
          onClick={handleProfileClick} // Click handler for profile picture
        />
        <span className="text-lg font-semibold text-white">{studentName}</span>
      </div>
    </header>
  );
};

export default Header;
