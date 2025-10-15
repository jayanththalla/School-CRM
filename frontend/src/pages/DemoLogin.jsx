import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SignIn } from '@clerk/clerk-react';
import ThemeToggle from '../components/ThemeToggle';

const DemoLogin = () => {
  const navigate = useNavigate();
  useAuth(); // Just call useAuth without destructuring
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState('demo'); // 'demo' or 'clerk'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Demo accounts for testing
    const demoAccounts = [
      {
        email: 'demo@school.com',
        password: 'demo123',
        user: {
          id: '1',
          name: 'Demo Parent',
          email: 'demo@school.com',
          role: 'parent',
          students: [
            {
              id: 'student1',
              name: 'John Doe',
              class: '10th Grade',
              section: 'A'
            }
          ]
        }
      },
      {
        email: 'parent@school.com',
        password: 'parent123',
        user: {
          id: '2',
          name: 'Sarah Johnson',
          email: 'parent@school.com',
          role: 'parent',
          students: [
            {
              id: 'student2',
              name: 'Emma Johnson',
              class: '9th Grade',
              section: 'B'
            }
          ]
        }
      }
    ];

    const account = demoAccounts.find(
      acc => acc.email === formData.email && acc.password === formData.password
    );

    if (account) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify(account.user));
      localStorage.setItem('token', 'demo-token-' + account.user.id);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use demo@school.com/demo123 or parent@school.com/parent123');
    }
  };

  const useDemoAccount1 = () => {
    setFormData({
      email: 'demo@school.com',
      password: 'demo123'
    });
  };

  const useDemoAccount2 = () => {
    setFormData({
      email: 'parent@school.com',
      password: 'parent123'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Theme Toggle - Top Right Corner */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <ThemeToggle />
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Theme</span>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">School CRM Login</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to access your dashboard</p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setAuthMode('demo')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${authMode === 'demo'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            Demo Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('clerk')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${authMode === 'clerk'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            OAuth Login
          </button>
        </div>

        {authMode === 'demo' ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            {/* Demo Account Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Demo Accounts:</h3>
              <div className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
                <div className="flex justify-between">
                  <span>Email: demo@school.com</span>
                  <button
                    type="button"
                    onClick={useDemoAccount1}
                    className="font-medium hover:underline"
                  >
                    Use this
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>Email: parent@school.com</span>
                  <button
                    type="button"
                    onClick={useDemoAccount2}
                    className="font-medium hover:underline"
                  >
                    Use this
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <SignIn
              path="/login"
              routing="path"
              signUpUrl="/signup"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-gray-900 dark:text-white",
                  headerSubtitle: "text-gray-600 dark:text-gray-400",
                  socialButtonsBlockButton: "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600",
                  formFieldInput: "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
                  formFieldLabel: "text-gray-700 dark:text-gray-300",
                  footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
                  identityPreviewText: "text-gray-600 dark:text-gray-400",
                  formHeaderTitle: "text-gray-900 dark:text-white",
                  formHeaderSubtitle: "text-gray-600 dark:text-gray-400"
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoLogin;