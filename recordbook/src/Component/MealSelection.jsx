import React, { useState, useMemo } from 'react';

const MealSelection = ({ arr, name, fun }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");

  const main = useMemo(() => arr.map((x) => ({ ...x })), [arr]);

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({ ...prev, [index]: Number(value) }));
  };

  const handleAddItem = (data, index) => {
    const quantity = quantities[index] || 1;
    const obj = {
      Quantity: quantity,
      calories: Math.round(quantity * data.calories),
      PlateType: data.PlateType,
      Dish: data.Dish,
    };

    fun(obj);
    setMessage(`Added ${quantity} ${data.PlateType} of ${data.Dish} to cart!`);
    setTimeout(() => setMessage(""), 3000);
  };

  const filteredArr = main.filter((x) =>
    x.Dish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {message && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50">
          {message}
        </div>
      )}

      <div className="flex justify-center gap-1 px-4">
        <input
          type="text"
          className="w-[70%] mt-6 h-[50px] border-2 border-black rounded-md bg-[#E4EA8C] px-5 text-[1.2em] font-serif font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Dish"
        />
      </div>

      {filteredArr.length === 0 && (
        <p className="text-center text-red-600 text-lg font-bold mt-6">
          No dishes found.
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-3 py-6 px-3">
        {filteredArr.map((data, index) => {
          const quantity = quantities[index] || 1;

          return (
            <div
              key={`${name}${index}`}
              className="w-[275px] bg-[#E4EA8C] h-[350px] rounded-md border-2 border-black font-mono font-bold text-[1.2em]"
            >
              <div className="h-[200px] border-b-2 border-black">
                <img src={data.path} alt={data.Dish} className="w-full h-full object-cover" />
              </div>

              <div className="border-b-2 border-black h-[50px] flex items-center px-2 overflow-y-auto">
                <span className="underline h-[36px] max-w-[500px] overflow-hidden overflow-x-auto">
                  {data.Dish}
                </span>
              </div>

              <div className="border-b-2 border-black h-[50px] px-2 flex items-center">
                <span>Quantity: </span>
                <input
                  type="number"
                  step={0.5}
                  min={0.5}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="bg-transparent overflow-auto w-[50px] font-mono text-center"
                />
                <span>{data.PlateType}</span>
              </div>

              <div className="border-b-2 border-black h-[50px] flex justify-start items-center px-2">
                <button
                  className="bg-[#F52549] min-w-[30%] px-2 hover:bg-[#FA6775]"
                  onClick={() => handleAddItem(data, index)}
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MealSelection;
