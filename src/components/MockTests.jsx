import React, { useState } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid'; // Tailwind Heroicons for correct and wrong indicators

// Sample JSON data for mock tests
const mockTestsData = [
  {
    id: 1,
    title: 'Mock Test 1',
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: { A: 'Berlin', B: 'Paris', C: 'Madrid', D: 'Rome' },
        answer: 'B',
        explanation: 'Paris is the capital of France.',
      },
      {
        id: 2,
        question: 'Who wrote "Hamlet"?',
        options: { A: 'Charles Dickens', B: 'Mark Twain', C: 'William Shakespeare', D: 'J.K. Rowling' },
        answer: 'C',
        explanation: 'William Shakespeare wrote "Hamlet".',
      },
      // Add more questions here up to 10
    ],
    userScore: null, // Store user score
  },
  {
    id: 2,
    title: 'Mock Test 2',
    questions: [
      {
        id: 1,
        question: 'What is the largest planet in our solar system?',
        options: { A: 'Earth', B: 'Mars', C: 'Jupiter', D: 'Saturn' },
        answer: 'C',
        explanation: 'Jupiter is the largest planet in our solar system.',
      },
      {
        id: 2,
        question: 'What element does "O" represent in the periodic table?',
        options: { A: 'Oxygen', B: 'Osmium', C: 'Oganesson', D: 'Oxium' },
        answer: 'A',
        explanation: 'The element "O" represents Oxygen.',
      },
      // Add more questions here up to 10
    ],
    userScore: null, // Store user score
  }
];

const MockTests = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store user's selected answers

  // Handle selecting a mock test
  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setSelectedAnswers({}); // Reset answers when a new test is selected
  };

  // Handle user's choice selection for each question
  const handleChoiceSelect = (testId, questionId, choice) => {
    if (!selectedAnswers[questionId]) { // Only allow answer selection once per question
      const updatedAnswers = { ...selectedAnswers, [questionId]: choice };
      setSelectedAnswers(updatedAnswers);
    }
  };

  // Calculate score after test completion
  const calculateScore = () => {
    let score = 0;
    selectedTest.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.answer) score++;
    });
    // Update the test's score after completion
    selectedTest.userScore = `${score}/${selectedTest.questions.length}`;
    setSelectedTest(null); // Reset after scoring
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-white min-h-screen">
      {/* Mock Test Tab Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Mock Tests</h1>

      {/* Test List */}
      <div className="w-full max-w-md mb-6">
        {mockTestsData.map((test) => (
          <div
            key={test.id}
            className="flex justify-between items-center p-4 mb-4 bg-white shadow-lg rounded-lg hover:bg-blue-100 cursor-pointer transition duration-300"
            onClick={() => handleTestSelect(test)}
          >
            <div className="text-lg font-semibold">{test.title}</div>
            <div className="text-sm text-gray-600">
              {test.userScore ? `Score: ${test.userScore}` : 'Pending'}
            </div>
          </div>
        ))}
      </div>

      {/* Question View */}
      {selectedTest && (
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{selectedTest.title}</h2>
          {selectedTest.questions.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="text-md font-medium text-gray-800 mb-3">{question.question}</p>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(question.options).map((key) => (
                  <button
                    key={key}
                    className={`p-3 rounded-lg border text-left transition duration-300 ${
                      selectedAnswers[question.id]
                        ? selectedAnswers[question.id] === key
                          ? selectedAnswers[question.id] === question.answer
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-red-100 border-red-500 text-red-700'
                          : 'border-gray-300 bg-gray-100'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleChoiceSelect(selectedTest.id, question.id, key)}
                    disabled={!!selectedAnswers[question.id]} // Disable after answering
                  >
                    <span className="font-semibold">{key}. </span>
                    {question.options[key]}
                  </button>
                ))}
              </div>

              {/* Explanation (only show after an answer is selected) */}
              {selectedAnswers[question.id] && (
                <p className="text-sm mt-2 text-gray-600">
                  {selectedAnswers[question.id] === question.answer ? (
                    <span className="text-green-600">
                      <CheckIcon className="h-5 w-5 inline-block" /> Correct! {question.explanation}
                    </span>
                  ) : (
                    <span className="text-red-600">
                      <XIcon className="h-5 w-5 inline-block" /> Incorrect. {question.explanation}
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={calculateScore}
          >
            Submit Test
          </button>
        </div>
      )}
    </div>
  );
};

export default MockTests;
