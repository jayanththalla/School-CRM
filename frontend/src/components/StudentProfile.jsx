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
