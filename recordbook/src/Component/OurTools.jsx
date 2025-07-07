import { Link } from "react-router-dom";

export default function OurTools() {
  const features = [
    { name: "BMI Calculator", link: "/bmi" },
    { name: "Swimming Calories", link: "/swim" },
    { name: "Walking Calories", link: "/walking" },
    { name: "Past Data Viewer", link: "/pastdata" },
    { name: "Rope Jumping Tracker", link: "/rope" },
    { name: "Best Cardio Finder", link: "/cardio" },
    { name: "Muscle Burn Analyzer", link: "/muscle" },
    { name: "Add Today's Data", link: "/TrackMyData" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-red-400">🛠 Explore Our Tools</h2>
        <p className="text-gray-400 mb-10 text-lg">
          These smart tools help you stay on track with fitness, calories, and goals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="block bg-gray-800 hover:bg-red-600 transition rounded-xl p-6 shadow-lg border border-gray-700 text-left"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
              <p className="text-blue-400 hover:underline">Click to explore →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
