import { useState, useEffect } from "react";

export default function BMICalculator() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const validateInput = () => {
      if (!gender || !age || !weight || !height) return "";
      if (isNaN(age) || isNaN(weight) || isNaN(height)) return "Please enter valid numbers.";
      if (age < 5 || age > 120) return "Age must be between 5 and 120 years.";
      if (weight < 20 || weight > 300) return "Weight must be between 20 and 300 kg.";
      if (height < 50 || height > 250) return "Height must be between 50 and 250 cm.";
      return "";
    };

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      setBmi("");
      setCategory("");
      return;
    }

    setError("");
    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(calculatedBmi);

    if (calculatedBmi < 18.5) setCategory("Underweight");
    else if (calculatedBmi < 24.9) setCategory("Normal weight");
    else if (calculatedBmi < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  }, [gender, age, weight, height]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-400">BMI Calculator</h2>
        <div className="flex flex-col gap-4">
          <select
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Age (years)"
            value={age}
            min="5"
            max="120"
            onChange={(e) => setAge(e.target.value || "")}
          />
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Weight (kg)"
            value={weight}
            min="20"
            max="300"
            onChange={(e) => setWeight(e.target.value || "")}
          />
          <input
            type="number"
            className="bg-gray-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Height (cm)"
            value={height}
            min="50"
            max="250"
            onChange={(e) => setHeight(e.target.value || "")}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        {bmi && (
          <div className="mt-6 text-center">
            <p className="text-xl sm:text-2xl">BMI: <span className="font-bold text-green-400">{bmi}</span></p>
            <p className="text-lg sm:text-xl mt-2">Category: <span className="font-bold text-yellow-400">{category}</span></p>
            <div className="relative bg-gray-700 h-5 sm:h-6 w-full rounded-lg mt-4 overflow-hidden shadow-lg">
              <div
                className={`absolute top-0 left-0 h-full rounded-lg transition-all duration-500 ${
                  category === "Underweight" ? "bg-blue-400" :
                  category === "Normal weight" ? "bg-green-500" :
                  category === "Overweight" ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
