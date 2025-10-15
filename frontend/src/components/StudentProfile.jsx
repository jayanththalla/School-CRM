<<<<<<< HEAD:frontend/src/components/StudentProfile.jsx
import React from 'react';

const StudentProfile = ({ student }) => {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center mb-4">
                <img src={student.profilePicture} alt="Profile" className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600" />
                <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{student.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">Class: {student.class}</p>
                    <p className="text-gray-600 dark:text-gray-300">Admission Number: {student.admissionNumber}</p>
                    {/* Add other details here */}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
=======
import React from 'react';

const StudentProfile = ({ student }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <img src={student.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-xl font-bold">{student.name}</h2>
                    <p className="text-gray-600">Class: {student.class}</p>
                    <p className="text-gray-600">Admission Number: {student.admissionNumber}</p>
                    {/* Add other details here */}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
>>>>>>> parent of 3f2c6da (Added dark and light mode feature to all pages):src/components/StudentProfile.jsx
