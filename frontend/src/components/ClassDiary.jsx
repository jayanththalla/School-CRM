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
