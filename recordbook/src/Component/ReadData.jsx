import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Day from './Day.jsx';
import { Link } from 'react-router-dom';

const ReadData = () => {
  const [mm, setmm] = useState(null);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0];

  const user = useSelector((state) => state.user);

  async function read() {
    const date1 = document.getElementById('readId').value;
    try {
      const response = await fetch('http://localhost:8000/api/calories/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: date1, user: user.email }),
      });

      const datatta = await response.json();
      setmm({
        breakfast: datatta.breakfast,
        lunch: datatta.lunch,
        dinner: datatta.dinner,
        snacks: datatta.snacks,
        n: true,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      {user.loggedIn ? (
        <div className="flex flex-col items-center w-full max-w-5xl">
          {/* Date Input + Button */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-md w-full sm:justify-center items-center">
            <input
              id="readId"
              className="p-2 border border-gray-300 rounded-md text-lg w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              defaultValue={formattedDate}
            />
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all w-full sm:w-auto"
              id="readbtn"
              onClick={read}
            >
              Get Data
            </button>
          </div>

          {/* Display Data */}
          <div className="w-full mt-8">
            {mm ? (
              <Day data={mm} />
            ) : (
              <p className="text-center text-gray-500 mt-6">Select a date and click "Get Data" to view records.</p>
            )}
          </div>
        </div>
      ) : (
        // Not Logged In UI
        <div className="w-full max-w-md bg-red-500 text-yellow-200 text-center p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Oops! You're not signed in</h2>
          <p className="mb-4">To track or view data, please sign in first.</p>
          <Link
            to="/login"
            className="inline-block bg-yellow-300 text-red-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Sign in now
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReadData;
