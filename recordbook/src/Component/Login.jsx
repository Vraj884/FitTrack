import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../RTK/userSlice.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.loggedIn) {
      navigate('/profile');
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        switch (res.status) {
          case 501:
            alert("Server can't connect to the database.");
            break;
          case 502:
            alert("Incorrect password.");
            break;
          case 503:
            alert("No account found for this email.");
            break;
          case 504:
          default:
            alert("An unexpected error occurred. Try again later.");
            break;
        }
        setLoading(false);
        return;
      }

      if (res.status === 210 || res.status === 200) {
        const data = await res.json();
        data.loggedIn = true;
        dispatch(login(data));
        localStorage.setItem("Authentication", JSON.stringify(data));
        navigate('/');
      }
    } catch (err) {
      alert("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!user.loggedIn && (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-4">
              Don’t have an account? <Link to="/SignUp" className="text-blue-500 hover:underline">Sign Up</Link><br /><br />
              <Link to="/" className="text-blue-500 hover:underline">Back to home</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
