<<<<<<< HEAD:frontend/src/components/ClassDiary.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

// Updated dummy data with additional subjects
const dummyDiaryData = {
  subjects: {
    All: {},
    Math: {
      "2024-09-01": "Introduction to Algebra.",
      "2024-09-02": "Solved exercises on quadratic equations.",
    },
    Science: {
      "2024-09-01": "Physics: Laws of Motion introduction.",
      "2024-09-02": "Chemistry: Balancing chemical equations.",
    },
    History: {
      "2024-09-01": "Chapter on the Renaissance period.",
      "2024-09-02": "Discussion on medieval civilizations.",
    },
    English: {
      "2024-09-01": "Essay writing on Shakespeare.",
      "2024-09-02": "Reading comprehension exercise.",
    },
    Geography: {
      "2024-09-01": "Introduction to map reading.",
      "2024-09-02": "Study of world climates.",
    },
    Art: {
      "2024-09-01": "Sketching basics.",
      "2024-09-02": "Color theory workshop.",
    }
  }
};

const ClassDiary = () => {
  const [currentSubject, setCurrentSubject] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryData, setDiaryData] = useState(dummyDiaryData);

  useEffect(() => {
    // Populate the 'All' subject with entries from all other subjects
    const allEntries = {};
    Object.entries(diaryData.subjects).forEach(([subject, entries]) => {
      if (subject !== 'All') {
        Object.entries(entries).forEach(([date, entry]) => {
          if (!allEntries[date]) allEntries[date] = {};
          allEntries[date][subject] = entry;
        });
      }
    });
    setDiaryData(prevData => ({
      ...prevData,
      subjects: {
        ...prevData.subjects,
        All: allEntries
      }
    }));
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const getDiaryEntry = () => {
    if (selectedDate) {
      if (currentSubject === 'All') {
        const allEntries = diaryData.subjects.All[selectedDate];
        if (allEntries) {
          return Object.entries(allEntries).map(([subject, entry]) => (
            <div key={subject} className="mb-2">
              <strong className="text-gray-900 dark:text-white">{subject}:</strong> <span className="text-gray-700 dark:text-gray-300">{entry}</span>
            </div>
          ));
        }
        return <span className="text-gray-600 dark:text-gray-400">No diary entries for this date.</span>;
      }
      return diaryData.subjects[currentSubject][selectedDate] || <span className="text-gray-600 dark:text-gray-400">No diary entry for this date.</span>;
    }
    return <span className="text-gray-600 dark:text-gray-400">Please select a date.</span>;
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center"
      >
        <Calendar className="mr-2 h-8 w-8" />
        Class Diary
      </motion.h2>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Subject Filter */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Select Subject</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(diaryData.subjects).map((subject) => (
              <button
                key={subject}
                onClick={() => setCurrentSubject(subject)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  currentSubject === subject
                    ? 'bg-blue-600 dark:bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Calendar */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{getCurrentMonth()}</h3>
            <div className="grid grid-cols-7 gap-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 p-2">
                  {day}
                </div>
              ))}
              
              {getDaysInMonth(new Date()).map((date) => {
                const dateString = date.toISOString().split('T')[0];
                const hasEntry = diaryData.subjects[currentSubject][dateString];
                const isSelected = selectedDate === dateString;
                
                return (
                  <motion.div
                    key={date.toISOString()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDateClick(date)}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-lg' 
                        : hasEntry 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900/50' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {date.getDate()}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Diary Entry */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Diary Entry for {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Selected Date'}
            </h3>
            <div className="text-gray-700 dark:text-gray-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDate}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {getDiaryEntry()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDiary;
=======
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

// Updated dummy data with additional subjects
const dummyDiaryData = {
  subjects: {
    All: {},
    Math: {
      "2024-09-01": "Introduction to Algebra.",
      "2024-09-02": "Solved exercises on quadratic equations.",
    },
    Science: {
      "2024-09-01": "Physics: Laws of Motion introduction.",
      "2024-09-02": "Chemistry: Balancing chemical equations.",
    },
    History: {
      "2024-09-01": "Chapter on the Renaissance period.",
      "2024-09-02": "Discussion on medieval civilizations.",
    },
    English: {
      "2024-09-01": "Essay writing on Shakespeare.",
      "2024-09-02": "Reading comprehension exercise.",
    },
    Geography: {
      "2024-09-01": "Introduction to map reading.",
      "2024-09-02": "Study of world climates.",
    },
    Art: {
      "2024-09-01": "Sketching basics.",
      "2024-09-02": "Color theory workshop.",
    }
  }
};

const ClassDiary = () => {
  const [currentSubject, setCurrentSubject] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryData, setDiaryData] = useState(dummyDiaryData);

  useEffect(() => {
    // Populate the 'All' subject with entries from all other subjects
    const allEntries = {};
    Object.entries(diaryData.subjects).forEach(([subject, entries]) => {
      if (subject !== 'All') {
        Object.entries(entries).forEach(([date, entry]) => {
          if (!allEntries[date]) allEntries[date] = {};
          allEntries[date][subject] = entry;
        });
      }
    });
    setDiaryData(prevData => ({
      ...prevData,
      subjects: {
        ...prevData.subjects,
        All: allEntries
      }
    }));
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const getDiaryEntry = () => {
    if (selectedDate) {
      if (currentSubject === 'All') {
        const allEntries = diaryData.subjects.All[selectedDate];
        if (allEntries) {
          return Object.entries(allEntries).map(([subject, entry]) => (
            <div key={subject} className="mb-2">
              <strong>{subject}:</strong> {entry}
            </div>
          ));
        }
        return 'No diary entries for this date.';
      }
      return diaryData.subjects[currentSubject][selectedDate] || 'No diary entry for this date.';
    }
    return 'Please select a date.';
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-gradient-to-r #f9fafc min-h-screen">
      <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-600 mb-6 flex items-center"
      >
        <Calendar className="mr-2" /> Class Diary
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="font-semibold text-gray-700 mr-2">Select Subject:</label>
          <select
            value={currentSubject}
            onChange={(e) => setCurrentSubject(e.target.value)}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(diaryData.subjects).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center text-blue-600 mb-2">{getCurrentMonth()}</h3>
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-500">{day}</div>
            ))}
            {getDaysInMonth(new Date()).map((date, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(date)}
                className={`aspect-square flex items-center justify-center rounded-full cursor-pointer text-sm
                  ${selectedDate === date.toISOString().split('T')[0]
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}
              >
                {date.getDate()}
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Diary Entry</h3>
            <div className="text-gray-700">{getDiaryEntry()}</div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ClassDiary;
>>>>>>> parent of 3f2c6da (Added dark and light mode feature to all pages):src/components/ClassDiary.jsx
