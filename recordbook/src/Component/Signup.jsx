import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../RTK/userSlice.js';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    email: '',
    phone: '',
    countryCode: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.loggedIn) {
      navigate('/Profile');
    }
  }, [user.loggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/user/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        navigate('/login');
      } else if (res.status === 502) {
        alert("User already exists with this Email ID");
      } else if (res.status === 501) {
        alert("Server not connected to Database");
      }
    } catch (e) {
      alert("No response from server");
    }
  };

  return (
    <>
      {!user.loggedIn && (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
          <div className="bg-gray-800 text-gray-200 rounded-lg shadow-2xl p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div>
                <label htmlFor="weight" className="block mb-1 font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="40"
                  max="180"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your weight"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="countryCode"
                    id="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    placeholder="+91"
                    className="w-20 px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                id="signupbtn"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/Login" className="text-blue-400 hover:underline">Login</Link><br />
              <Link to="/" className="text-blue-400 hover:underline">Back to home</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
