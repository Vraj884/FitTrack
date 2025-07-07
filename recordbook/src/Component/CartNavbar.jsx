import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Day from './Day';

const CartNavbar = ({ cart }) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prev) => !prev);

  return (
    <>
      <div className="w-full bg-black text-white text-lg font-bold flex justify-end">
        <button
          onClick={toggleCart}
          className="px-6 py-3 flex items-center gap-2 hover:bg-gray-700 transition"
        >
          Items <FaShoppingCart />
        </button>
      </div>

      {showCart && <Day data={cart} />}
    </>
  );
};

export default CartNavbar;
