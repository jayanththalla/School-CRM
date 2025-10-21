import React, { useState, useEffect } from 'react';
import { FaBell, FaCalendarAlt, FaDollarSign, FaExclamationCircle, FaTable } from 'react-icons/fa';

const Notifications = () => {
  // Dummy data for demonstration. In production, this data would come from an API.
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'exam',
      message: 'Math exam is scheduled for 20th September.',
      date: '2024-09-08',
      read: false,
    },
    {
      id: 2,
      type: 'fee',
      message: 'Your school fee for the month of September is due.',
      date: '2024-09-01',
      read: false,
    },
    {
      id: 3,
      type: 'attendance',
      message: 'Your child is absent today.',
      date: '2024-09-05',
      read: false,
    },
    {
      id: 4,
      type: 'event',
      message: 'Parent-teacher meeting is scheduled for 25th September.',
      date: '2024-09-15',
      read: true,
    },
    {
      id: 5,
      type: 'Timetable',
      message: 'Timetable 25th September.',
      date: '2024-09-14',
      read: true,
    },
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Determine the icon based on the type of notification
  const getIcon = (type) => {
    switch (type) {
      case 'exam':
        return <FaCalendarAlt className="text-blue-500" />;
      case 'fee':
        return <FaDollarSign className="text-green-500" />;
      case 'attendance':
        return <FaExclamationCircle className="text-red-500" />;
      case 'Timetable':
        return <FaTable className='text-yellow-500'/>;
      case 'event':
        return <FaBell className="text-yellow-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow flex items-center justify-between hover:bg-blue-100 cursor-pointer transition-transform transform hover:scale-105 ${
                notification.read ? 'bg-gray-100' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-4 ">
                {/* Notification Icon */}
                <div className="text-2xl">
                  {getIcon(notification.type)}
                </div>

                {/* Notification Message */}
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-gray-500 text-sm">{new Date(notification.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Mark as read button */}
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
