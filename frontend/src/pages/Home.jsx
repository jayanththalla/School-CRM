import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="text-center">
        <img
          src="https://i.pinimg.com/originals/48/a3/54/48a354314bb3517dabc705eb3ee8b968.jpg" 
          alt="School Logo"
          className="h-24 w-24 mx-auto rounded-full"
        />
        <h1 className="text-4xl font-bold text-blue-600 mt-4">Welcome to School App</h1>
        <p className="text-lg text-gray-700 mt-2">Your gateway to a streamlined school experience.</p>
      </div>

      <div className="mt-8 space-y-4">
        <Link to="/login">
          <button className="px-6 py-3 mr-5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3  bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
