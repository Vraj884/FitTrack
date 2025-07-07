import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../RTK/userSlice.js';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: user.name || "",
    age: user.age || "",
    weight: user.weight || "",
    countryCode: user.countryCode || "",
    phone: user.phoneNo || "",
    email: user.email || "",
  });

  useEffect(() => {
    setFormData({
      name: user.name || "",
      age: user.age || "",
      weight: user.weight || "",
      countryCode: user.countryCode || "",
      phone: user.phoneNo || "",
      email: user.email || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add update API here
    alert("Changes saved (UI only for now)");
  };

  const logout_logic = () => {
    const previous = JSON.parse(localStorage.getItem("Authentication"));
    if (previous?.loggedIn) {
      localStorage.removeItem("Authentication");
      dispatch(logout());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {user.loggedIn && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 text-white p-8 font-sans rounded-xl shadow-xl w-full max-w-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Your Account Details</h2>

          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "Weight (kg)", name: "weight", type: "number" },
            { label: "Country Code", name: "countryCode", type: "text" },
            { label: "Phone Number", name: "phone", type: "text" },
            { label: "Email", name: "email", type: "email", readonly: true },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                readOnly={field.readonly}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={logout_logic}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
