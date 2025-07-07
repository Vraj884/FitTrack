import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown } from 'react-icons/ti';
import { IoMdClose } from 'react-icons/io';

import { login, logout } from '../RTK/userSlice.js';
import MealSelection from './MealSelection.jsx';
import CartNavbar from './CartNavbar.jsx';

import Boiled from './myIMG/Boiled egg.jpg';
import iadada from './myIMG/idada.jpg';
import idli1 from './myIMG/idli sambhar.jpg';
import idli from './myIMG/idli.jpg';
import Omlette from './myIMG/Omlette.jpg';
import pohe from './myIMG/pohe.jpg';
import Upma from './myIMG/Upma.jpg';

const mealList = [
  { Dish: 'Pohe', PlateType: 'Cup', calories: 250, path: pohe },
  { Dish: 'Boiled egg', PlateType: 'Unit', calories: 80, path: Boiled },
  { Dish: 'Upma', PlateType: 'Cup', calories: 225, path: Upma },
  { Dish: 'Idada', PlateType: 'Piece', calories: 60, path: iadada },
  { Dish: 'Idli', PlateType: 'Piece', calories: 45, path: idli1 },
  { Dish: 'Idli with sambhar & chutney', PlateType: 'Unit', calories: 250, path: idli },
  { Dish: 'Omlet', PlateType: 'Unit', calories: 80, path: Omlette },
  { Dish: "Dual egg's omlet", PlateType: 'Unit', calories: 160, path: Omlette }
];

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const myobj = {
    breakfastFlag: false,
    lunchFlag: false,
    snacksFlag: false,
    dinnerFlag: false
  };

  const [x, setx] = useState(myobj);

  const [cart, setcart] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  });

  const toggleFlag = (type) => {
    setx({ ...myobj, [`${type}Flag`]: !x[`${type}Flag`] });
  };

  const exists = (arr, dish) => arr.some((item) => item.Dish === dish);
  const dishindex = (arr, dish) => arr.findIndex((item) => item.Dish === dish);

  const addToCart = (mealType, data) => {
    setcart((prev) => {
      const updated = [...prev[mealType]];
      const index = dishindex(updated, data.Dish);

      if (index !== -1) {
        updated[index].Quantity = Number(data.Quantity) + Number(updated[index].Quantity);
        updated[index].calories += data.calories;
      } else {
        updated.push(data);
      }

      return { ...prev, [mealType]: updated };
    });
  };

  const meals = [
    { name: 'Breakfast', flag: x.breakfastFlag, key: 'breakfast' },
    { name: 'Lunch', flag: x.lunchFlag, key: 'lunch' },
    { name: 'Snacks', flag: x.snacksFlag, key: 'snacks' },
    { name: 'Dinner', flag: x.dinnerFlag, key: 'dinner' }
  ];

  return (
    <>
      <CartNavbar cart={cart} />

      {user.loggedIn ? (
        <div className="w-full max-w-screen-lg px-4 mx-auto">
          {meals.map(({ name, flag, key }) => (
            <div key={key} className="my-6 bg-[#F96167] rounded-lg shadow-md overflow-hidden select-none">
              <div className="flex justify-between items-center px-4 py-3 bg-[#E4EA8C] font-mono text-xl sm:text-2xl font-bold">
                <span>{name}</span>
                <span
                  onClick={() => toggleFlag(key)}
                  className="cursor-pointer hover:bg-[#f1ff2d] p-1 rounded transition"
                >
                  {flag ? <IoMdClose /> : <TiArrowSortedDown />}
                </span>
              </div>

              {flag && (
                <MealSelection
                  arr={mealList}
                  name={name}
                  fun={(data) => addToCart(key, data)}
                  cart={cart}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="my-48 w-[90%] sm:w-[30%] bg-[#F96167] text-[1.5em] text-yellow-400 font-bold rounded-lg p-6 text-center space-y-3">
            <h2>Oops, Looks like you haven't signed in</h2>
            <h4>- To track the data, You have to Sign in.</h4>
            <h6>
              <Link to="/login" className="font-mono text-blue-700 hover:text-yellow-300">
                - Sign in right now
              </Link>
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
