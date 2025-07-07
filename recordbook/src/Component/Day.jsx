import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Day = ({ data }) => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState(null);

  const mealKeys = ['breakfast', 'lunch', 'snacks', 'dinner'];

  const getTotalCalories = () => {
    return mealKeys.reduce((total, meal) => {
      return total + data[meal].reduce((sum, item) => sum + item.calories, 0);
    }, 0);
  };

  const tableRows = (arr, mealName) =>
    arr.map((item, i) => (
      <tr key={`${mealName}-${i}`}>
        <td className='tableindex'>{i + 1}.</td>
        <td className='tableDish'>{item.Dish}</td>
        <td className='tableQuantity'>{`${item.Quantity} ${item.PlateType}`}</td>
        <td className='tableCalories'>{`${item.calories} calories`}</td>
      </tr>
    ));

  const uploadMyData = async () => {
    const date = new Date();
    const payload = {
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      user: user.email,
      breakfast: data.breakfast,
      lunch: data.lunch,
      snacks: data.snacks,
      dinner: data.dinner,
    };

    try {
      const res = await fetch("http://localhost:8000/api/calories/update", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Data saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save data. Please try again." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const totalCalories = getTotalCalories();

  const hasData = mealKeys.some((key) => data[key].length > 0);

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-[550px] bg-[#58ff4f] rounded-lg my-4 text-[1.2em] font-bold'>

        {message && (
          <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-md text-white z-50
            ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}

        <div className='text-center underline my-4'>Current items that are added</div>

        {mealKeys.map((meal) =>
          data[meal].length > 0 && (
            <div key={meal} className='w-full text-left px-8'>
              <span className='underline'>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</span>
              <table className='border-black border-[1px] w-full mt-2 mb-4'>
                <tbody>
                  {tableRows(data[meal], meal)}
                </tbody>
              </table>
            </div>
          )
        )}

        {hasData ? (
          <div className='w-full text-left px-8'>
            <span className='underline'>Total:</span>
            <table className='border-black border-[1px] w-full mt-2 mb-4'>
              <tbody>
                <tr>
                  <td className='tableindex'>✅</td>
                  <td className='tableDish'>Includes all meals</td>
                  <td className='tableQuantity'>-</td>
                  <td className='tableCalories'>{`${totalCalories} calories`}</td>
                </tr>
              </tbody>
            </table>
            <div className='text-center mb-8'>
              {!data?.uploaded && (
                <button
                  className='bg-red-600 text-white px-8 py-2 rounded-md hover:bg-red-400 border-[3px] border-black'
                  onClick={uploadMyData}
                >
                  Save Today's Data
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className='text-center mb-6'>Please add some items for records</div>
        )}
      </div>
    </div>
  );
};

export default Day;
