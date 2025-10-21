import React, { useState } from 'react';

// Dummy backend response for attendance data
const dummyAttendanceData = {
  "2024-05-01": "present",
  "2024-05-02": "absent",
  "2024-05-03": "publicHoliday",
  "2024-05-04": "present",
  "2024-05-05": "present",
  "2024-05-06": "notTracked",
  "2024-05-07": "absent",
  "2024-05-08": "publicHoliday",
  // Add more dates as needed
};

const Attendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(dummyAttendanceData);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getAttendanceStatus = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return attendanceData[dateString] || 'unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#4CAF50'; // Green for present
      case 'absent': return '#F44336'; // Red for absent
      case 'publicHoliday': return '#64B5F6'; // Light Blue for public holiday
      case 'notTracked': return '#FFEB3B'; // Yellow for not tracked
      default: return '#E0E0E0'; // Gray for unknown
    }
  };

  const handleDateClick = (date) => {
    const status = getAttendanceStatus(date);
    if (status === 'absent') {
      alert('Notification sent to parent for absence.');
    }
  };

  const calculateAttendance = () => {
    const total = Object.values(attendanceData).filter(status => status !== 'publicHoliday' && status !== 'notTracked').length;
    const attended = Object.values(attendanceData).filter(status => status === 'present').length;
    return `${attended}/${total}`;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f9fafc'
    }}>
      <div style={{
        width: '450px',
        height: '500px',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: '"Poppins", sans-serif'
      }}>
        {/* Attendance Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Attendance</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px', fontSize: '1.5rem', color: '#2196F3' }}>📅</span>
            <span style={{ fontWeight: '600', fontSize: '1rem', color: '#555' }}>{calculateAttendance()}</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '8px', 
          marginBottom: '24px', 
          flexGrow: 1
        }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} style={{ 
              textAlign: 'center', 
              fontWeight: '600', 
              fontSize: '1rem', 
              color: '#757575'
            }}>
              {day}
            </div>
          ))}
          {getDaysInMonth(currentMonth).map((date, index) => {
            const status = getAttendanceStatus(date);
            const statusColor = getStatusColor(status);
            return (
              <div
                key={index}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  fontSize: '0.9rem',
                  color: '#333',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => handleDateClick(date)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = statusColor;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#333';
                }}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
          {['Present', 'Absent', 'Public Holiday', 'Not Tracked'].map((label, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: getStatusColor(label.toLowerCase().replace(' ', '')), 
                marginBottom: '4px' 
              }}></div>
              <span style={{ fontSize: '0.7rem', color: '#757575' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Notification */}
        <div style={{
          padding: '16px',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          backgroundColor: '#F5F5F5',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '1.2rem', color: '#2196F3' }}>ℹ️</span>
          <p style={{ margin: 0, color: '#333' }}>
            Click on a date for more details. Notifications are sent for absences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
