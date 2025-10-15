<<<<<<< HEAD:frontend/src/components/Timetable.jsx
import React, { useState } from 'react';
import { BookOpenIcon, CalculatorIcon, BeakerIcon, GlobeAltIcon, ColorSwatchIcon, AcademicCapIcon } from '@heroicons/react/solid';
import { Dumbbell, FlaskConical, Activity, Upload, Download, RefreshCw } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

const sampleSchedule = {
  'Monday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',
  },
  'Tuesday': {
    '08:00 AM': 'Chemistry',
    '09:00 AM': 'Math',
    '10:00 AM': 'Geography',
    '11:00 AM': 'History',
    '12:00 PM': 'Art',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Break',
    '03:00 PM': 'Music',
  },
  'Wednesday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',
  },
  'Thursday': {
    '08:00 AM': 'Chemistry',
    '09:00 AM': 'Math',
    '10:00 AM': 'Geography',
    '11:00 AM': 'History',
    '12:00 PM': 'Art',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Break',
    '03:00 PM': 'Music',
  },
  'Friday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',
  },
  'Saturday': {
    '09:00 AM': 'Games',
    '10:00 AM': 'Math',
    '11:00 AM': 'Geography',
    '12:00 PM': 'History',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Break',
    '03:00 PM': 'Art',
  },
};

const subjectIcons = {
  'Math': <CalculatorIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  'English': <BookOpenIcon className="h-5 w-5 text-green-600 dark:text-green-400" />,
  'History': <AcademicCapIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
  'Biology': <FlaskConical className="h-5 w-5 text-pink-600 dark:text-pink-400" />,
  'Physical Education': <Dumbbell className="h-5 w-5 text-red-600 dark:text-red-400" />,
  'Chemistry': <BeakerIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
  'Geography': <GlobeAltIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
  'Art': <ColorSwatchIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
  'Games': <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />,
  'Lunch': <ColorSwatchIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
  'Break': <ColorSwatchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
  'Music': <ColorSwatchIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
};

const Timetable = () => {
  const [schedule, setSchedule] = useState(sampleSchedule);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileKey, setFileKey] = useState(0); // Add key for file input re-rendering

  // Function to parse CSV data
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const newSchedule = {};
    
    // Initialize schedule structure
    daysOfWeek.forEach(day => {
      newSchedule[day] = {};
      times.forEach(time => {
        newSchedule[day][time] = '';
      });
    });

    // Parse CSV data starting from second line (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',').map(value => value.trim());
      
      if (values.length >= 3) {
        const day = values[0];
        const time = values[1];
        const subject = values[2];
        
        if (daysOfWeek.includes(day) && times.includes(time)) {
          newSchedule[day][time] = subject;
        }
      }
    }
    
    return newSchedule;
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setUploadMessage('Please upload a valid CSV file.');
      return;
    }

    setIsLoading(true);
    setUploadMessage('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const newSchedule = parseCSV(csvText);
        setSchedule(newSchedule);
        setIsUploaded(true);
        setUploadMessage('Timetable updated successfully from CSV!');
      } catch (error) {
        setUploadMessage('Error parsing CSV file. Please check the format.');
      } finally {
        setIsLoading(false);
        // Clear the file input to allow re-uploading the same file
        event.target.value = '';
        // Force re-render of file input
        setFileKey(prev => prev + 1);
      }
    };

    reader.onerror = () => {
      setUploadMessage('Error reading file.');
      setIsLoading(false);
      // Clear the file input on error too
      event.target.value = '';
      // Force re-render of file input
      setFileKey(prev => prev + 1);
    };

    reader.readAsText(file);
  };

  // Reset to sample schedule
  const resetToSample = () => {
    setSchedule(sampleSchedule);
    setIsUploaded(false);
    setUploadMessage('Reset to sample timetable.');
  };

  // Download sample CSV template
  const downloadSampleCSV = () => {
    let csvContent = 'Day,Time,Subject\n';
    
    // Generate CSV content from the current sample schedule
    daysOfWeek.forEach(day => {
      times.forEach(time => {
        if (sampleSchedule[day] && sampleSchedule[day][time]) {
          csvContent += `${day},${time},${sampleSchedule[day][time]}\n`;
        }
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timetable_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Weekly Timetable</h2>
      
      {/* File Upload Section */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
              <Upload className="h-5 w-5" />
              <span>Upload CSV</span>
              <input
                key={fileKey}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            
            <button
              onClick={downloadSampleCSV}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download Template</span>
            </button>
            
            <button
              onClick={resetToSample}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
          
          {isUploaded && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-semibold">
              <span>✓</span>
              <span>Custom Timetable</span>
            </div>
          )}
        </div>
        
        {uploadMessage && (
          <div className={`mt-3 p-2 rounded text-sm ${
            uploadMessage.includes('Error') || uploadMessage.includes('Error')
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          }`}>
            {uploadMessage}
          </div>
        )}
        
        {isLoading && (
          <div className="mt-3 flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Processing CSV file...</span>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
          <thead className="bg-blue-600 dark:bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 border-b border-blue-500 dark:border-blue-600 text-lg">Time</th>
              {daysOfWeek.map(day => (
                <th key={day} className="px-6 py-3 border-b border-blue-500 dark:border-blue-600 text-lg">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-3 font-bold border-r border-gray-200 dark:border-gray-700 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">{time}</td>
                {daysOfWeek.map(day => (
                  <td key={day} className="px-6 py-3 border-r border-gray-200 dark:border-gray-700 text-center">
                    <div
                      className={`flex items-center justify-center space-x-2 p-2 rounded-md ${
                        schedule[day] && schedule[day][time]
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {schedule[day] && schedule[day][time] ? (
                        <>
                          {subjectIcons[schedule[day][time]] || <ColorSwatchIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
                          <span className="font-semibold">{schedule[day][time]}</span>
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
      
      {/* Instructions */}
      <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">CSV Format Instructions:</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Upload a CSV file with columns: <strong>Day, Time, Subject</strong>. 
          Days should be: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. 
          Times should be in format: 08:00 AM, 09:00 AM, etc. 
          Download the template for reference.
        </p>
      </div>
    </div>
  );
};

export default Timetable;
=======
import React, { useState } from 'react';
import { BookOpenIcon, CalculatorIcon, BeakerIcon, GlobeAltIcon, ColorSwatchIcon, AcademicCapIcon } from '@heroicons/react/solid';
import { Dumbbell, FlaskConical, Activity, Upload, Download, RefreshCw } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

const sampleSchedule = {
  'Monday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',
  },
  'Tuesday': {
    '08:00 AM': 'Chemistry',
    '09:00 AM': 'Math',
    '10:00 AM': 'Geography',
    '11:00 AM': 'History',
    '12:00 PM': 'Art',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Break',
    '03:00 PM': 'Music',
  },
  'Wednesday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',
  },
  'Thursday': {
    '08:00 AM': 'Chemistry',
    '09:00 AM': 'Math',
    '10:00 AM': 'Geography',
    '11:00 AM': 'History',
    '12:00 PM': 'Art',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Break',
    '03:00 PM': 'Music',
  },
  'Friday': {
    '08:00 AM': 'Math',
    '09:00 AM': 'English',
    '10:00 AM': 'History',
    '11:00 AM': 'Biology',
    '12:00 PM': 'Physical Education',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Games',
    '03:00 PM': 'Break',
  },
  'Saturday': {
    '09:00 AM': 'Games',
    '10:00 AM': 'Math',
    '11:00 AM': 'Geography',
    '12:00 PM': 'History',
    '01:00 PM': 'Lunch',
    '02:00 PM': 'Break',
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
  'Lunch': <ColorSwatchIcon className="h-5 w-5 text-gray-600" />,
  'Break': <ColorSwatchIcon className="h-5 w-5 text-gray-400" />,
  'Music': <ColorSwatchIcon className="h-5 w-5 text-indigo-600" />,
};

const Timetable = () => {
  const [schedule, setSchedule] = useState(sampleSchedule);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileKey, setFileKey] = useState(0); // Add key for file input re-rendering

  // Function to parse CSV data
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const newSchedule = {};
    
    // Initialize schedule structure
    daysOfWeek.forEach(day => {
      newSchedule[day] = {};
      times.forEach(time => {
        newSchedule[day][time] = '';
      });
    });

    // Parse CSV data starting from second line (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',').map(value => value.trim());
      
      if (values.length >= 3) {
        const day = values[0];
        const time = values[1];
        const subject = values[2];
        
        if (daysOfWeek.includes(day) && times.includes(time)) {
          newSchedule[day][time] = subject;
        }
      }
    }
    
    return newSchedule;
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setUploadMessage('Please upload a valid CSV file.');
      return;
    }

    setIsLoading(true);
    setUploadMessage('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const newSchedule = parseCSV(csvText);
        setSchedule(newSchedule);
        setIsUploaded(true);
        setUploadMessage('Timetable updated successfully from CSV!');
      } catch (error) {
        setUploadMessage('Error parsing CSV file. Please check the format.');
      } finally {
        setIsLoading(false);
        // Clear the file input to allow re-uploading the same file
        event.target.value = '';
        // Force re-render of file input
        setFileKey(prev => prev + 1);
      }
    };

    reader.onerror = () => {
      setUploadMessage('Error reading file.');
      setIsLoading(false);
      // Clear the file input on error too
      event.target.value = '';
      // Force re-render of file input
      setFileKey(prev => prev + 1);
    };

    reader.readAsText(file);
  };

  // Reset to sample schedule
  const resetToSample = () => {
    setSchedule(sampleSchedule);
    setIsUploaded(false);
    setUploadMessage('Reset to sample timetable.');
  };

  // Download sample CSV template
  const downloadSampleCSV = () => {
    let csvContent = 'Day,Time,Subject\n';
    
    // Generate CSV content from the current sample schedule
    daysOfWeek.forEach(day => {
      times.forEach(time => {
        if (sampleSchedule[day] && sampleSchedule[day][time]) {
          csvContent += `${day},${time},${sampleSchedule[day][time]}\n`;
        }
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timetable_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Weekly Timetable</h2>
      
      {/* File Upload Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              <Upload className="h-5 w-5" />
              <span>Upload CSV</span>
                             <input
                 key={fileKey}
                 type="file"
                 accept=".csv"
                 onChange={handleFileUpload}
                 className="hidden"
                 disabled={isLoading}
               />
            </label>
            
            <button
              onClick={downloadSampleCSV}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download Template</span>
            </button>
            
            <button
              onClick={resetToSample}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
          
          {isUploaded && (
            <div className="flex items-center space-x-2 text-green-600 font-semibold">
              <span>✓</span>
              <span>Custom Timetable</span>
            </div>
          )}
        </div>
        
        {uploadMessage && (
          <div className={`mt-3 p-2 rounded text-sm ${
            uploadMessage.includes('Error') || uploadMessage.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {uploadMessage}
          </div>
        )}
        
        {isLoading && (
          <div className="mt-3 flex items-center space-x-2 text-blue-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Processing CSV file...</span>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto flex-1">
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
                        schedule[day] && schedule[day][time]
                          ? 'bg-blue-50 text-blue-800 shadow-md'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      {schedule[day] && schedule[day][time] ? (
                        <>
                          {subjectIcons[schedule[day][time]] || <ColorSwatchIcon className="h-5 w-5 text-gray-600" />}
                          <span className="font-semibold">{schedule[day][time]}</span>
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
      
      {/* Instructions */}
      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">CSV Format Instructions:</h3>
        <p className="text-sm text-blue-700">
          Upload a CSV file with columns: <strong>Day, Time, Subject</strong>. 
          Days should be: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. 
          Times should be in format: 08:00 AM, 09:00 AM, etc. 
          Download the template for reference.
        </p>
      </div>
    </div>
  );
};

export default Timetable;
>>>>>>> parent of 3f2c6da (Added dark and light mode feature to all pages):src/components/Timetable.jsx
