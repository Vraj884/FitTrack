import muscle from './myIMG/muscle.jpg'
import cardio from './myIMG/cardio.jpg'
import Swimming from './myIMG/Swimming.jpg'
import Walking from './myIMG/Walking.webp'
import previousData from './myIMG/previousData.jpg'
import rope from './myIMG/Rope.jpg'
import BMI from './myIMG/BMI.png'
import addData from './myIMG/addData.jpg'
import { Link } from 'react-router-dom'

const CardGrid = () => {
  const cards = [
    { title: "What's Your BMI?", img: BMI, Link: "/BMI" },
    { title: "Add Today's meal data", img: addData, Link: "/TrackMyData" },
    { title: "Previous Data", img: previousData, Link: "/pastdata" },
    { title: "Best Muscle Training", img: muscle, Link: "/muscle" },
    { title: "best Cardio ", img: cardio, Link: "/cardio" },
    { title: "Walking", img: Walking, Link: "/walking" },
    { title: "Rope Jumping", img: rope, Link: "/rope" },
    { title: "Swimming", img: Swimming, Link: "/swim" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {cards.map((card, index) => (
          <Link to={card.Link} key={index} className="w-full max-w-sm">
            <div className="w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300 cursor-pointer">
              <div className="aspect-video sm:aspect-[3/4] w-full">
                <img src={card.img} className="w-full h-full object-cover" alt={card.title} />
              </div>
              <div className="bg-gray-700 text-white text-center py-4 px-2 font-semibold text-lg">
                {card.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
