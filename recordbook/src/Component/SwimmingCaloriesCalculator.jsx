import { useState, useEffect } from "react";

export default function SwimmingCaloriesCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [swimType, setSwimType] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [error, setError] = useState("");

  const MET_VALUES = {
    leisurely: 6.0,
    moderate: 8.0,
    vigorous: 10.0,
    butterfly: 13.8,
    freestyle: 9.8,
    backstroke: 7.0,
    breaststroke: 10.3
  };

  useEffect(() => {
    const validateInput = () => {
      if (!weight || !duration || !swimType) return "";
      if (isNaN(weight) || isNaN(duration)) return "Please enter valid numbers.";
      if (weight < 30 || weight > 300) return "Weight must be between 30 and 300 kg.";
      if (duration < 1 || duration > 300) return "Duration must be between 1 and 300 minutes.";
      if (!MET_VALUES.hasOwnProperty(swimType)) return "Please select a valid swim type.";
      return "";
    };

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      setCaloriesBurned("");
      return;
    }
    
    setError("");
    const MET = MET_VALUES[swimType];
    const burned = ((MET * parseFloat(weight) * 3.5) / 200) * parseFloat(duration);
    setCaloriesBurned(burned.toFixed(1));
  }, [weight, duration, swimType]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Swimming Calories Calculator</h2>
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
          <select
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            value={swimType}
            onChange={(e) => setSwimType(e.target.value || "")}
          >
            <option value="" disabled>Select Swim Type</option>
            <option value="leisurely">Leisurely Swimming</option>
            <option value="moderate">Moderate Swimming</option>
            <option value="vigorous">Vigorous Swimming</option>
            <option value="butterfly">Butterfly Stroke</option>
            <option value="freestyle">Freestyle Stroke</option>
            <option value="backstroke">Backstroke</option>
            <option value="breaststroke">Breaststroke</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        {caloriesBurned && (
          <div className="mt-6 text-center">
            <p className="text-2xl">Calories Burned: <span className="font-bold text-green-400">{caloriesBurned}</span> kcal</p>
            <div className="relative bg-gray-700 h-6 w-full rounded-lg mt-4 overflow-hidden shadow-lg">
              <div
                className="absolute top-0 left-0 bg-green-500 h-full rounded-lg transition-all duration-500"
                style={{ width: `${Math.min((caloriesBurned / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
