<<<<<<< HEAD:frontend/src/components/Fee.jsx
import React from 'react';
import { motion} from 'framer-motion';

const Fee = () => {
    // Sample fee data
    const fees = [
        { term: 'Term 1', dueDate: '2024-01-15', status: 'paid' },
        { term: 'Term 2', dueDate: '2024-06-15', status: 'due' },
        { term: 'Term 3', dueDate: '2024-12-15', status: 'overdue' },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-500 dark:bg-green-600 text-white';
            case 'due':
                return 'bg-yellow-500 dark:bg-yellow-600 text-white';
            case 'overdue':
                return 'bg-red-500 dark:bg-red-600 text-white';
            default:
                return 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
            <div className="max-w-md mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">Fee Status</h2>
                    
                    <ul className="space-y-4">
                        {fees.map((fee, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div>
                                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{fee.term}</span>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Due Date: {new Date(fee.dueDate).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyles(fee.status)}`}>
                                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Summary Section */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Summary</h3>
                        <div className="space-y-1 text-sm">
                            <p className="text-blue-700 dark:text-blue-300">
                                <span className="font-medium">Total Terms:</span> {fees.length}
                            </p>
                            <p className="text-green-700 dark:text-green-300">
                                <span className="font-medium">Paid:</span> {fees.filter(f => f.status === 'paid').length}
                            </p>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <span className="font-medium">Due:</span> {fees.filter(f => f.status === 'due').length}
                            </p>
                            <p className="text-red-700 dark:text-red-300">
                                <span className="font-medium">Overdue:</span> {fees.filter(f => f.status === 'overdue').length}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Fee;
=======
import React from 'react';
import { motion} from 'framer-motion';

const Fee = () => {
    // Sample fee data
    const fees = [
        { term: 'Term 1', dueDate: '2024-01-15', status: 'paid' },
        { term: 'Term 2', dueDate: '2024-06-15', status: 'due' },
        { term: 'Term 3', dueDate: '2024-12-15', status: 'overdue' },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-500 text-white';
            case 'due':
                return 'bg-yellow-500 text-white';
            case 'overdue':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
             <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-600 mb-6 flex items-center"
      >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Fee Status</h2>
            </motion.h2>
            {/* <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Fee Status</h2> */}
            <ul>
                {fees.map((fee, index) => (
                    <li key={index} className="mb-4">
                        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                            <div>
                                <span className="text-lg font-semibold text-gray-700">{fee.term}</span>
                                <p className="text-sm text-gray-500">Due Date: {new Date(fee.dueDate).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full ${getStatusStyles(fee.status)}`}>
                                {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Fee;
>>>>>>> parent of 3f2c6da (Added dark and light mode feature to all pages):src/components/Fee.jsx
