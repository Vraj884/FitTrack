import { useState, useEffect } from "react";

export default function CardioCaloriesCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [sortedActivities, setSortedActivities] = useState([]);
  const [error, setError] = useState("");

  const CARDIO_ACTIVITIES = {
    "Running": 11.5,
    "Cycling": 8.0,
    "Jump Rope": 12.3,
    "Rowing": 10.0,
    "Swimming": 9.5,
    "Stair Climbing": 8.8,
    "Elliptical": 7.5,
    "Walking": 3.8
  };

  useEffect(() => {
    const validateInput = () => {
      if (!weight || !duration || selectedActivities.length === 0) return "";
      if (isNaN(weight) || isNaN(duration)) return "Please enter valid numbers.";
      if (weight < 30 || weight > 300) return "Weight must be between 30 and 300 kg.";
      if (duration < 1 || duration > 300) return "Duration must be between 1 and 300 minutes.";
      return "";
    };

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      setSortedActivities([]);
      return;
    }

    setError("");
    const calculatedActivities = selectedActivities.map(activity => {
      const MET = CARDIO_ACTIVITIES[activity];
      const calories = ((MET * parseFloat(weight) * 3.5) / 200) * parseFloat(duration);
      return { name: activity, calories: calories.toFixed(1) };
    });

    setSortedActivities(calculatedActivities.sort((a, b) => b.calories - a.calories));
  }, [weight, duration, selectedActivities]);

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="bg-gray-900 w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-400">
          Cardio Calories Calculator
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Weight (kg)"
            value={weight}
            min="30"
            max="300"
            onChange={(e) => setWeight(e.target.value || "")}
          />
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Duration (minutes)"
            value={duration}
            min="1"
            max="300"
            onChange={(e) => setDuration(e.target.value || "")}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.keys(CARDIO_ACTIVITIES).map(activity => (
              <button
                key={activity}
                className={`p-2 text-sm sm:text-base rounded-lg transition duration-200 ${
                  selectedActivities.includes(activity)
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "bg-gray-800 hover:bg-blue-400"
                }`}
                onClick={() => toggleActivity(activity)}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {sortedActivities.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-center">
              Sorted by Calories Burned
            </h3>
            <ul className="mt-3">
              {sortedActivities.map((activity, index) => (
                <li
                  key={index}
                  className="text-center text-base sm:text-lg mt-1"
                >
                  {activity.name}:{" "}
                  <span className="font-bold text-green-400">
                    {activity.calories}
                  </span>{" "}
                  kcal
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
