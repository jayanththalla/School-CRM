import React, { useState } from 'react';
import axios from 'axios'; // For making API requests
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // For Google OAuth

const Login = () => {
  // State for email, OTP, and managing the login stage
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });

  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP was sent

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submitting email for OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to your backend to send OTP
      await axios.post('/api/auth/login', { email: formData.email });
      setIsOtpSent(true); // Move to OTP input stage
      alert("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error.response.data.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP submission for login verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify the OTP and log in the user
      const response = await axios.post('/api/auth/verify-login', { email: formData.email, otp: formData.otp });
      // Store the JWT token locally after successful login
      localStorage.setItem('token', response.data.token);
      // Redirect or show success message
      alert("Login successful!");
    } catch (error) {
      console.error("Error verifying OTP:", error.response.data.message);
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle Google authentication
  const handleGoogleSuccess = async (response) => {
    try {
      // Send the Google ID token to your backend for verification
      const googleResponse = await axios.post('/api/auth/google-login', { token: response.credential });
      
      // Store the JWT token locally after successful login
      localStorage.setItem('token', googleResponse.data.token);
      
      // Redirect or show success message
      alert("Login with Google successful!");
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
    alert("Failed to log in with Google. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

          {/* Form for email submission or OTP input */}
          {isOtpSent ? (
            // OTP input form
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter the OTP sent to your email"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Verify OTP</button>
            </form>
          ) : (
            // Email input form
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Send OTP</button>
            </form>
          )}

          {/* Google login button */}
          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          <div className="text-center mt-4">
            <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
