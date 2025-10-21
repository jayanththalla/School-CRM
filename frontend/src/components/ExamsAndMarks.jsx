import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CheckCircleIcon, XCircleIcon, DocumentTextIcon } from '@heroicons/react/solid';
import 'chart.js/auto'; // Automatically register all necessary components
import { motion } from 'framer-motion';

// Sample data for exams
const examsData = [
  {
    id: 1,
    subject: 'Math',
    examName: 'Algebra Test',
    date: '2024-09-10',
    status: 'Completed',
    scores: {
      Math: 95,
      Science: 88,
      History: 92,
    },
    maxScore: 100,
    grade: 'A',
  },
  {
    id: 2,
    subject: 'Science',
    examName: 'Physics Midterm',
    date: '2024-09-12',
    status: 'Pending',
    scores: {
      Math: null,
      Science: null,
      History: null,
    },
    maxScore: 100,
    grade: null,
  },
  {
    id: 3,
    subject: 'History',
    examName: 'Renaissance Quiz',
    date: '2024-09-15',
    status: 'Completed',
    scores: {
      Math: 88,
      Science: 92,
      History: 85,
    },
    maxScore: 100,
    grade: 'B+',
  },
];

const ExamsAndMarks = () => {
  const [selectedExam, setSelectedExam] = useState(null);

  // Handle selecting an exam for details view
  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
  };

  // Prepare data for the bar graph
  const chartData = {
    labels: examsData.map(exam => exam.examName),
    datasets: [
      {
        label: 'Math',
        data: examsData.map(exam => exam.scores.Math !== null ? exam.scores.Math : 0), // Use 0 if score is null
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Science',
        data: examsData.map(exam => exam.scores.Science !== null ? exam.scores.Science : 0), // Use 0 if score is null
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'History',
        data: examsData.map(exam => exam.scores.History !== null ? exam.scores.History : 0), // Use 0 if score is null
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-white min-h-screen">
      {/* Exams Dashboard Header */}
      <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-600 mb-6 flex items-center"
      >
      <h1 className="text-3xl font-bold text-blue-600 mb-8 ">Exams Dashboard</h1>

      </motion.h2>
      {/* Exams List */}
      <div className="w-full max-w-3xl mb-6">
        {examsData.map((exam) => (
          <div
            key={exam.id}
            className="flex justify-between items-center p-4 mb-4 bg-white shadow-lg rounded-lg hover:bg-blue-100 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleExamSelect(exam)}
          >
            <div className="text-lg font-semibold">{exam.examName}</div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">{exam.subject}</span> | {exam.date}
            </div>
            <div className={`text-sm ${exam.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
              {exam.status === 'Completed' ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 inline-block mr-1" /> Completed
                </>
              ) : (
                <>
                  <XCircleIcon className="h-5 w-5 inline-block mr-1" /> Pending
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Graph for Marks */}
      <div className="w-full max-w-3xl mb-6">
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Exam Scores',
            },
          },
        }} />
      </div>

      {/* Exam Details View */}
      {selectedExam && (
        <div className="w-full max-w-lg mt-6 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{selectedExam.examName}</h2>
          <p className="text-md text-gray-800 mb-2">Subject: <span className="font-semibold">{selectedExam.subject}</span></p>
          <p className="text-md text-gray-800 mb-4">Date: <span className="font-semibold">{selectedExam.date}</span></p>
          {selectedExam.status === 'Completed' ? (
            <>
              <div className="mb-4">
                <p className="text-lg font-semibold">Scores:</p>
                <ul>
                  <li>Math: <span className="text-blue-600">{selectedExam.scores.Math}</span> / {selectedExam.maxScore}</li>
                  <li>Science: <span className="text-blue-600">{selectedExam.scores.Science}</span> / {selectedExam.maxScore}</li>
                  <li>History: <span className="text-blue-600">{selectedExam.scores.History}</span> / {selectedExam.maxScore}</li>
                </ul>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">Grade: <span className="text-blue-600">{selectedExam.grade}</span></p>
              </div>
              <div className="mt-6 text-gray-600">
                <DocumentTextIcon className="h-6 w-6 inline-block mr-2" />
                <span>Exam Details and Faculty Actions: Faculty reviews and updates scores. Reports are generated for analysis.</span>
              </div>
            </>
          ) : (
            <p className="text-lg text-gray-600">Exam is pending. Scores will be updated after completion.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamsAndMarks;
