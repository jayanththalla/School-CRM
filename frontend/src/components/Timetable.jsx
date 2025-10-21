import React from 'react';
import { BookOpenIcon, CalculatorIcon, BeakerIcon, GlobeAltIcon, ColorSwatchIcon, AcademicCapIcon } from '@heroicons/react/solid';
import { Dumbbell, FlaskConical, Activity } from 'lucide-react'; // Use Activity icon from lucide-react

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

const sampleSchedule = {
  'Monday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',  // Lunch added
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',   // Break added
  },
  'Tuesday': {
    '08:00 AM': 'Chemistry',
    '09:00 AM': 'Math',
    '10:00 AM': 'Geography',
    '11:00 AM': 'History',
    '12:00 PM': 'Art',
    '01:00 PM': 'Lunch',  // Lunch added
    '02:00 PM': 'Break',   // Break added
    '03:00 PM': 'Music',
  },
  'Wednesday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',  // Lunch added
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',   // Break added
  },
  'Thursday': {
    '08:00 AM': 'Chemistry',
    '09:00 AM': 'Math',
    '10:00 AM': 'Geography',
    '11:00 AM': 'History',
    '12:00 PM': 'Art',
    '01:00 PM': 'Lunch',  // Lunch added
    '02:00 PM': 'Break',   // Break added
    '03:00 PM': 'Music',
  },
  'Friday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',  // Lunch added
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',   // Break added
  },
  'Saturday': {
    '09:00 AM': 'Games',
    '10:00 AM': 'Math',
    '11:00 AM': 'Geography',
    '12:00 PM': 'History',
    '01:00 PM': 'Lunch',  // Lunch added
    '02:00 PM': 'Break',   // Break added
    '03:00 PM': 'Art',
  },
};

const subjectIcons = {
  'Math': <CalculatorIcon className="h-5 w-5 text-blue-600" />,
  'English': <BookOpenIcon className="h-5 w-5 text-green-600" />,
  'History': <AcademicCapIcon className="h-5 w-5 text-purple-600" />,
  'Biology': <FlaskConical className="h-5 w-5 text-pink-600" />,
  'Physical Education': <Dumbbell className="h-5 w-5 text-red-600" />,
  'Chemistry': <BeakerIcon className="h-5 w-5 text-yellow-600" />,
  'Geography': <GlobeAltIcon className="h-5 w-5 text-teal-600" />,
  'Art': <ColorSwatchIcon className="h-5 w-5 text-orange-600" />,
  'Games': <Activity className="h-5 w-5 text-green-600" />,
  'Lunch': <ColorSwatchIcon className="h-5 w-5 text-gray-600" />, // Icon for Lunch
  'Break': <ColorSwatchIcon className="h-5 w-5 text-gray-400" />, // Icon for Break
};

const Timetable = () => {
  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Weekly Timetable</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 border-b text-lg">Time</th>
              {daysOfWeek.map(day => (
                <th key={day} className="px-6 py-3 border-b text-lg">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time} className="border-t border-gray-200">
                <td className="px-6 py-3 font-bold border-r bg-blue-100 text-blue-800">{time}</td>
                {daysOfWeek.map(day => (
                  <td key={day} className="px-6 py-3 border-r text-center">
                    <div
                      className={`flex items-center justify-center space-x-2 p-2 rounded-md ${
                        sampleSchedule[day] && sampleSchedule[day][time]
                          ? 'bg-blue-50 text-blue-800 shadow-md'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      {sampleSchedule[day] && sampleSchedule[day][time] ? (
                        <>
                          {subjectIcons[sampleSchedule[day][time]]}
                          <span className="font-semibold">{sampleSchedule[day][time]}</span>
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
