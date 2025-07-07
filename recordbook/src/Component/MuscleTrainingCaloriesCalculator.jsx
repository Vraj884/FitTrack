import { useState, useEffect } from "react";

export default function MuscleTrainingCaloriesCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [sortedExercises, setSortedExercises] = useState([]);
  const [error, setError] = useState("");

  const MUSCLE_TRAINING_EXERCISES = {
    "Deadlifts": 9.0,
    "Squats": 8.5,
    "Bench Press": 7.0,
    "Pull-ups": 8.0,
    "Push-ups": 6.5,
    "Lunges": 7.5,
    "Bicep Curls": 5.0,
    "Tricep Dips": 6.0
  };

  useEffect(() => {
    const validate = () => {
      if (!weight || !duration || selectedExercises.length === 0) return "";
      if (isNaN(weight) || isNaN(duration)) return "Please enter valid numbers.";
      if (weight < 30 || weight > 300) return "Weight must be between 30 and 300 kg.";
      if (duration < 1 || duration > 300) return "Duration must be between 1 and 300 minutes.";
      return "";
    };

    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      setSortedExercises([]);
    } else {
      setError("");
      const calculated = selectedExercises.map((exercise) => {
        const MET = MUSCLE_TRAINING_EXERCISES[exercise];
        const calories = ((MET * parseFloat(weight) * 3.5) / 200) * parseFloat(duration);
        return { name: exercise, calories: calories.toFixed(1) };
      });
      setSortedExercises(calculated.sort((a, b) => b.calories - a.calories));
    }
  }, [weight, duration, selectedExercises]);

  const toggleExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise) ? prev.filter((e) => e !== exercise) : [...prev, exercise]
    );
  };

  const totalCalories = sortedExercises.reduce((sum, ex) => sum + Number(ex.calories), 0).toFixed(1);

  const resetAll = () => {
    setWeight("");
    setDuration("");
    setSelectedExercises([]);
    setSortedExercises([]);
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-400">Muscle Training Calories Calculator</h2>
        
        <div className="flex flex-col gap-4">
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Enter Weight (kg)"
            value={weight}
            min="30"
            max="300"
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Enter Duration (minutes)"
            value={duration}
            min="1"
            max="300"
            onChange={(e) => setDuration(e.target.value)}
          />

          {/* Exercise selection */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(MUSCLE_TRAINING_EXERCISES).map(([exercise, MET]) => (
              <button
                key={exercise}
                className={`p-2 rounded-lg ${
                  selectedExercises.includes(exercise) ? "bg-red-500" : "bg-gray-800"
                } hover:bg-red-400 transition`}
                onClick={() => toggleExercise(exercise)}
                role="checkbox"
                aria-checked={selectedExercises.includes(exercise)}
              >
                {exercise}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        {sortedExercises.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center">Sorted by Calories Burned</h3>
            <ul className="mt-3 space-y-1 text-center">
              {sortedExercises.map((exercise, i) => (
                <li key={i} className="text-lg">
                  {exercise.name}: <span className="font-bold text-green-400">{exercise.calories}</span> kcal
                </li>
              ))}
            </ul>
            <p className="text-center mt-4 text-lg">
              <span className="font-bold text-yellow-400">Total Burn:</span>{" "}
              <span className="font-bold text-green-300">{totalCalories} kcal</span>
            </p>
          </div>
        )}

        {/* Reset Button */}
        {(weight || duration || selectedExercises.length > 0) && (
          <div className="text-center mt-6">
            <button
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-md border border-gray-600"
              onClick={resetAll}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
