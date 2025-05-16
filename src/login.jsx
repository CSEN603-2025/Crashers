import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'lubna@gmail.com') {
    localStorage.setItem("role", "student");
    navigate('/availableCompanies');
    } 
    else if (email === 'company@example.com') {
    localStorage.setItem("role", "company");
navigate('/company');}
   
   else if (email === 'jana@gmail.com') {
    localStorage.setItem("role", "pro");

      navigate('/availableCompanies');
    } 
    else if (email === 'scad@example.com') {
    localStorage.setItem("role", "scad");

      navigate('/scad');
    } 
     else if (email === 'faculty@example.com') {
      localStorage.setItem("role", "faculty");

      navigate('/studentHome');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md border-l-8 border-green-600">
        <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type='submit'
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-all"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;