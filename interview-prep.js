// Interview questions and answers based on the School-CRM System project

const interviewQnA = [
  {
    question: "What are the key features of the School CRM System you developed?",
    answer: "The key features include parent signup/login with email verification, student profiles accessible by parents and admins, a dashboard with timetable, notifications, fee and attendance tiles, class diary with calendar view, mock tests, assignments submission, and attendance tracking."
  },
  {
    question: "How do you manage user authentication in the School CRM System?",
    answer: "User authentication is handled securely using token-based APIs, with password protection and email verification for parents during signup and login."
  },
  {
    question: "Describe how the mock tests feature works in your CRM system.",
    answer: "Mock tests present multiple-choice questions to students with only one attempt allowed per question. Correct and incorrect answers are highlighted with explanations, and scores are calculated and displayed upon test completion."
  },
  {
    question: "What technologies and frameworks did you use in this project?",
    answer: "The frontend is developed with React and Tailwind CSS for a clean user experience, while the backend uses Node.js and Express to provide RESTful APIs and data fetching via JSON."
  },
  {
    question: "How do you handle attendance tracking in your system?",
    answer: "Attendance is tracked and displayed in a calendar view, with attended dates marked in green and absences in red. Public holidays are excluded using a dummy JSON response for data.",
  },
  {
    question: "Explain how the class diary feature is implemented.",
    answer: "The class diary uses a calendar interface where clicking a date shows diary entries for the student for that day, with details of enrolled subjects dynamically fetched from the backend."
  },
  {
    question: "What testing strategies were used during development?",
    answer: "Dummy JSON data is used for features like mock tests and attendance, and basic validation checks are implemented for file uploads and form inputs."
  },
  {
    question: "What future enhancements are planned for this project?",
    answer: "Future enhancements include push notifications for real-time updates, progress tracking dashboards, and role-based user enhancements for teachers, students, and admins."
  }
];

export default interviewQnA;
