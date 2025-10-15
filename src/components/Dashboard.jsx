import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, BellIcon, CreditCardIcon, UserIcon, 
  DocumentTextIcon, LightBulbIcon, ClipboardListIcon 
} from '@heroicons/react/solid';

const Dashboard = ({ user }) => {
  const userName = user?.name || 'John Doe';
  const userGender = user?.gender || 'male';
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-blue-600 text-white ">
        {/* Logo and School Name */}
        <div className="flex flex-col items-center ">
          <img
            src="https://i.pinimg.com/originals/48/a3/54/48a354314bb3517dabc705eb3ee8b968.jpg" // Sample school logo
            alt="School Logo"
            className="h-9 w-9 rounded-full"
          />
          <h1 className="text-xl font-bold">School</h1>
        </div>

        {/* Profile Picture and User Name */}
        <div className="flex flex-col items-center ">
          <img
            src={userGender === 'male' 
              ? 'https://www.w3schools.com/howto/img_avatar.png'  // Sample male profile picture
              : 'https://th.bing.com/th/id/OIP.p2m_4WGdDauoB1jZ9LrjuQHaHa?w=195&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7'} // Sample female profile picture
            alt="Profile"
            className="h-9 w-9 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
          <span>{userName}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Timetable */}
          <Link to="/timetable" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <CalendarIcon className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Timetable</h3>
              <p className="text-gray-600">View your weekly schedule.</p>
            </div>
          </Link>

          {/* Notifications */}
          <Link to="/notifications" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Notifications</h3>
              <p className="text-gray-600">Check recent alerts and messages.</p>
            </div>
          </Link>

          {/* Fee Details */}
          <Link to="/fee" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <CreditCardIcon className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Fee Details</h3>
              <p className="text-gray-600">Review and manage your fees.</p>
            </div>
          </Link>

          {/* Attendance */}
          <Link to="/attendance" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <UserIcon className="h-6 w-6 text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold">Attendance</h3>
              <p className="text-gray-600">Track your attendance record.</p>
            </div>
          </Link>

          {/* Class Diary */}
          <Link to="/class-diary" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <DocumentTextIcon className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">Class Diary</h3>
              <p className="text-gray-600">View your class diary entries.</p>
            </div>
          </Link>

          {/* Mock Tests */}
          <Link to="/mock-tests" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <LightBulbIcon className="h-6 w-6 text-orange-500" />
            <div>
              <h3 className="text-lg font-semibold">Mock Tests</h3>
              <p className="text-gray-600">Practice with mock tests.</p>
            </div>
          </Link>

          {/* Assignments */}
          <Link to="/assignments" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <ClipboardListIcon className="h-6 w-6 text-teal-500" />
            <div>
              <h3 className="text-lg font-semibold">Assignments</h3>
              <p className="text-gray-600">Submit and manage your assignments.</p>
            </div>
          </Link>

          {/* Exams and Marks */}
          <Link to="/exams-and-marks" className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
            <DocumentTextIcon className="h-6 w-6 text-pink-500" />
            <div>
              <h3 className="text-lg font-semibold">Exams and Marks</h3>
              <p className="text-gray-600">Check your exam results and scores.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
